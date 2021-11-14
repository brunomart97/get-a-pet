const router = require('express').Router();

const PetController = require('../controllers/PetController');

// Middlewares
const verifyToken = require('../helpers/verifyToken');

router.post('/create', verifyToken, PetController.create);

module.exports = router;