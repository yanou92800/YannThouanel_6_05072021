const mongoose = require('mongoose');
const uniqueValidator = require ('mongoose-unique-validator')

const userSchema = mongoose.Schema({ // Schéma de données
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator); //appliquer plugin

module.exports = mongoose.model('User', userSchema); // Exporter schéma en tant que modèle Mongoose appelé User