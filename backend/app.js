const express = require('express'); // importer package express
const mongoose = require('mongoose'); // importer package mongoose
const path = require('path');

const saucesRoutes = require('./routes/sauces'); // enregistre routeur importer et importer sauces

const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://yanou92:GRWdazwwN1n46F83@cluster0.6qmxj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
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

// appliquer routeur
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;