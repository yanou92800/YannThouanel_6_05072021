const express = require('express'); // import express
const router = express.Router(); // crée routeur express

const auth = require('../middleware/auth'); //importe le middelware de protection de route

const multer = require('../middleware/multer-config'); //middelware de gestion de fichier

const saucesCtrl = require('../controllers/sauces'); //importe la logique métier de sauce

router.post('/', auth, multer, saucesCtrl.createSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.get('/', auth, saucesCtrl.getSauces);
router.get('/:id', auth, saucesCtrl.getSauceById);
router.post('/:id/like', auth, saucesCtrl.likeDislike);

module.exports = router;