// Logique métier pour user

const bcrypt = require('bcrypt');

const User = require('../models/User');

const jwt = require('jsonwebtoken');

const cryptojs = require('crypto-js'); //package de cryptage (utilisé pour l'email)

require('dotenv').config();

// fonction pour s'inscire
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // fonction hasher/crypter un mdp, 10 tours pour créer un mdp safe (pas trop de salt)
      .then(hash => { 
        const user = new User({
          email: cryptojs.hmac-sha512(req.body.email, `${process.env.TOKEN}`).toString(),
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

// fonction pour se connecter
exports.login = (req, res, next) => {
User.findOne({ email: cryptojs.hmac-sha512(req.body.email, `${process.env.TOKEN}`).toString() })
    .then(user => { //recherche l'utilisateur correspondant
    if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    bcrypt.compare(req.body.password, user.password) //compare avec bcrypt le password de la requête et celui dans MongoDB
        .then(valid => {
        if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }
        res.status(200).json({
            userId: user._id, //renvoie _ID généré par MongoDB
            token: jwt.sign( // renvoie Token d'auth
            { userId: user._id }, //données à encoder (=payload)
            `${process.env.TOKEN}`, //clé secrète pour l'encodage
            { expiresIn: '24h' } // durée de validité du TOKEN
            )
        });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};