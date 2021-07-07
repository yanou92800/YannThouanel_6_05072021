// contient schéma du mot de passe utilisateur 
// Minimum 8 et 50 caractères, minuscule ET majuscule, au moins 1 chiffre, pas d'espace

//importe package password-validator
const passwordValidator = require('password-validator');

//créé le schéma
let passwordSchema = new passwordValidator();
 
//propriétés du schéma
passwordSchema
.is().min(7)                                    // Minimum 7 caractères
.is().max(50)                                  // Maximum 50
.has().uppercase()                              // Doit avoir au moins une lettre majuscule
.has().lowercase()                              // Doit avoir au moins une lettre minuscule
.has().digits()                                // Au moins un chiffre
.has().not().spaces()                           // Pas d'espace

//exorte le schéma
module.exports = passwordSchema;