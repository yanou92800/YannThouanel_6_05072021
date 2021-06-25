const Thing = require('../models/Thing');

const fs = require('fs'); 

exports.createThing = (req, res, next) => { // route et le middleware
    const thingObject = JSON.parse(req.body.thing);
    delete thingObject._id; // Suppression en amont du faux_id envoyé par le front-end
    const thing = new Thing({ // Instance (new) du modèle Thing en passant un objet JavaScript contenant toutes les informations requises du corps de requête analysé
      ...thingObject, // Opérateur spread ... utilisé pour faire une copie de tous les éléments de req.body
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    thing.save() // enregistrer objet Thing dans la base de données
      .then(() => res.status(201).json({ message: 'Objet enregistré !'})) // Renvoie une promesse (réussie)
      .catch(error => res.status(400).json({ error }));
  };

  exports.modifyThing = (req, res, next) => {
    const thingObject = req.file ?
      {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // S'il existe on traite l'image
      } : { ...req.body };
      if (req.file) { // Si un nouveau fichier est affecté alors tu rentres dans le code ci-dessous
        Thing.findOne({ _id: req.params.id }) // on recupere le thing concerné (ce qui nous retourne une promesse)
        .then(thing => { // on lui dit que dans ce thing il va appliquer le code suivant
            const filename = thing.imageUrl.split('images/')[1]; // on va chercher l'ancienne image et on la met dans un variable 'filename'
            fs.unlink(`images/${filename}`, (error => {if (error) console.log(error)}))// on lui dit de unlink (supprimer) l'image selectionnée plus haut dans la variable filename
        })
        .catch(error => res.status(500).json({ error }));
    }
    Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };

  exports.deleteThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
      .then(thing => {
        const filename = thing.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Thing.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };

exports.getOneThing = (req, res, next) => { //deux-points : en face du segment dynamique de la route pour la rendre accessible en tant que paramètre
    Thing.findOne({ _id: req.params.id }) //méthode findOne() du modèle Thing pour trouver le Thing unique ayant le même _id que le paramètre de la requête
      .then(thing => res.status(200).json(thing)) // Thing retourné dans une Promise et envoyé au front-end
      .catch(error => res.status(404).json({ error }));
  };

exports.getAllThing = (req, res, next) => { 
    Thing.find() // méthode find() du modèle Mongoose afin de renvoyer un tableau contenant tous les Things de la base de données
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
  };