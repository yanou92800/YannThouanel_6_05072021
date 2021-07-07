// Schéma de données d'une sauce

const mongoose = require('mongoose'); // import mongoose

const sauceSchema = mongoose.Schema({ // Schéma de données
    userId: { type: String, require: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number},
    dislikes: { type: Number},
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] },
});

module.exports = mongoose.model('Sauce', sauceSchema); // Exporter schéma en tant que modèle Mongoose appelé Sauce