const router = require('express').Router();

const PetController = require('../controllers/PetController');

// Middlewares
const verifyToken = require('../helpers/verifyToken');
const { imageUpload } = require('../helpers/imageUpload');

router.post(
  '/create',
  verifyToken,
  imageUpload.array('images'),
  PetController.create
);
router.get('/', PetController.getAll);

module.exports = router;