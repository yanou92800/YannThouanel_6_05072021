const http = require('http'); // importer le package
const app = require('./app'); // importer l'application

const normalizePort = val => { // renvoie un port valide
  const port = parseInt(val, 10);

  if (isNaN(port)) { // si port n'est pas un nombre
    return val; // renvoie valeur
  }
  if (port >= 0) { // si port >= 0
    return port; // renvoie le port
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000'); //permet de se servir de tous les ports
app.set('port', port);

const errorHandler = error => { // recherche les différentes erreurs et les gère
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES': // si permission refusée
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE': // si port déjà utilisé
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app); //crée server

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port); // le server doit écouter les requêtes envoyées, numéro du port qu'on veut écouter
