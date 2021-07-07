// Gestion des fichiers envoyés vers l'API

const multer = require('multer');  // import package multer

const MIME_TYPES = { //dictionnaire pour créer l'extension du fichier à partir du MIMETYPE
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({ // enregistrer les fichiers entrants :
  destination: (req, file, callback) => { // destination
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_'); //gestion des espaces dans le nom d'origine du fichier
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension); //créé le filename complet
  }
});

module.exports = multer({storage: storage}).single('image');