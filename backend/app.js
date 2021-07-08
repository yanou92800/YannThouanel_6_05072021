require('dotenv').config();
const express = require('express'); // importer package express
const mongoose = require('mongoose'); // importer package mongoose
const path = require('path'); //donne accès au chemin de notre système de fichier
const xss = require('xss-clean'); // Désinfecte le HTML non fiable (pour empêcher XSS) avec une configuration spécifiée par une liste blanche.
const hpp = require('hpp'); // Protège contre les attaques de pollution des paramètres HTTP
const rateLimit = require('express-rate-limit'); //limite les requêtes par IP
const helmet = require('helmet'); //définit divers en-têtes HTTP sécurisées
const mongoSanitize = require('express-mongo-sanitize'); //protège des attaques par injection NoSQL(MongoDB)

//100 requêtes toutes les 15min par IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});

const saucesRoutes = require('./routes/sauces'); // enregistre routeur importer et importer sauces

const userRoutes = require('./routes/user');

// connexion à bdd MongoDB via mongoose
mongoose.connect(`${process.env.DB_URL}`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
const app = express();
  
// middleware ajout de headers dans l'objet réponse (comme html)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Accès à l'API depuis n'importe quelle origine ( '*' )
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  // Ajouts headers (Origin, X-Requested-Width etc) aux requêtes envoyées vers l'API
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  // envoi requêtes avec telles méthodes ( GET ,POST , etc.)
  next(); // renvoi la réponse au client
});

app.use(express.json());

app.use('/api', apiLimiter); // limiteur de requêtes s'applique seulement aux requêtes commençant par API (=ne concerne pas les express.static)
app.use(xss());
app.use(hpp());
app.use(helmet());
app.use(mongoSanitize());

// appliquer routeur
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;