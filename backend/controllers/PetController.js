const Pet = require('../models/Pet');

// Helpers
const getToken = require('../helpers/getToken');
const getUserByToken = require('../helpers/getUserByToken');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = class PetController {
  // Create a pet
  static async create(req, res) {
    const {
      name,
      age,
      weight,
      color
    } = req.body;

    const images = req.files;

    const available = true;

    // Images upload

    // Validations
    if(!name) {
      res.status(422)
      .json({
        message: 'O nome é obrigatório!'
      });
      return;
    }

    if(!age) {
      res.status(422)
      .json({
        message: 'A idade é obrigatório!'
      });
      return;
    }

    if(!weight) {
      res.status(422)
      .json({
        message: 'O peso é obrigatório!'
      });
      return;
    }

    if(!color) {
      res.status(422)
      .json({
        message: 'A cor é obrigatório!'
      });
      return;
    }

    if(images.length === 0) {
      res.status(422)
      .json({
        message: 'A imagem é obrigatório!'
      });
      return;
    }
    
    // Get pet owner
    const token = getToken(req);
    const user = await getUserByToken(token);

    // Create a pet
    const pet = new Pet({
      name,
      age,
      weight,
      color,
      available,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone
      }
    });

    images.map((image) => {
      pet.images.push(image.filename);
    });
    
    try {
      const newPet = await pet.save();
      
      res.status(201)
      .json({
        message: 'Pet cadastrado com sucesso!',
        newPet
      });

    } catch (error) {
      res.status(500).json({message: error});
    }
  }

  // Getting all pets
  static async getAll(req, res) {
    const pets = await Pet.find().sort('-createdAt');
    res.status(200)
    .json({
      pets
    });
  }

  // Getting all pets of a user
  static async getAllUserPets(req, res) {
    // Get user from token
    const token = getToken(req);
    const user = await getUserByToken(token);

    const pets = await Pet.find({'user._id': user._id}).sort('-createdAt');
    res.status(200)
    .json({
      pets
    });
  }

  // Getting all adoptions of a user
  static async getAllUserAdoptions(req, res) {
    // Get user from token
    const token = getToken(req);
    const user = await getUserByToken(token);

    const pets = await Pet.find({'adopter._id': user._id}).sort('-createdAt');
    res.status(200)
    .json({
      pets
    });
  }

  // Getting pet by ID
  static async getPetById(req, res) {
    const id = req.params.id;

    // Check if ID is valid
    if(!ObjectId.isValid(id)) {
      res.status(422)
      .json({
        message: 'ID inválido!'
      });
      return;
    }

    // Check if pet exists
    const pet = await Pet.findOne({_id: id});

    if(!pet) {
      res.status(404)
      .json({
        message: 'Pet não encontrado!'
      });
      return;
    }

    res.status(200)
    .json({
      pet
    });
  }

  // Deleting oet by ID
  static async removePetById(req, res) {
    const id = req.params.id;

    // Check if ID is valid
    if(!ObjectId.isValid(id)) {
      res.status(422)
      .json({
        message: 'ID inválido!'
      });
      return;
    }

    // Check if pet exists
    const pet = await Pet.findOne({_id: id});

    if(!pet) {
      res.status(404)
      .json({
        message: 'Pet não encontrado!'
      });
      return;
    }
    
    // Check if logged in user registered the pet
    const token = getToken(req);
    const user = await getUserByToken(token);

    if(pet.user._id.toString() !== user._id.toString()) {
      res.status(422)
      .json({
        message: 'Houve um problema em processar a sua solicitação. Tente novamente mais tarde!'
      });
      return;
    }

    await Pet.findByIdAndRemove(id);
    res.status(200)
    .json({
      message: 'Pet removido com sucesso!'
    });
    return;
  }
}