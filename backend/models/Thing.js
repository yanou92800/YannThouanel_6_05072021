const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({ // Schéma de données
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true },
});

module.exports = mongoose.model('Thing', thingSchema); // Exporter schéma en tant que modèle Mongoose appelé Thing