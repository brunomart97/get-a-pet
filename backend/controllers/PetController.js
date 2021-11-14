const Pet = require('../models/Pet');

// Helpers
const getToken = require('../helpers/getToken');
const getUserByToken = require('../helpers/getUserByToken');

module.exports = class PetController {
  // Create a pet
  static async create(req, res) {
    const {
      name,
      age,
      weight,
      color
    } = req.body;

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
}