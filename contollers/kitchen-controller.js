const Joi = require('joi');

const serviceKitchen = require('../models/kitchen');

const {HttpError} = require('../helpers')


const AddSchema = Joi.object({
    name: Joi.string().required(),
    ingridient: Joi.string()
});


const getAllKitchen = async (req, res, next) => {
    try {
        const result = await serviceKitchen.getAllKitchen();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const getProductKitchen = async (req, res, next) => {
    try {
        const {name} = req.params;
        const result = await serviceKitchen.getProductKitchen(name);
        if (!result) {
            throw HttpError(404, `Позицію з назвою ${name} не знайдено!`)
        }
        res.status(200).json(result);
    } catch (error) {
        
    }
}

const addProductKitchen = async (req, res, next) => {
    try {
      const {error} = AddSchema.validate(req.body);
      if (error) {
        throw HttpError(404, error.message)
      }
      const result = await serviceKitchen.addProductKitchen(req.body);
      res.status(201).json(result);
    }
     catch (error) {
      next(error);
    }
  }


const updateProductKitchen = async (req, res, next) => {
    try {
        const {productId} = req.params;
        const result = await serviceKitchen.editProductKitchen(productId, req.body);
        if (!result) {
            throw HttpError(404, `Такий товар не знайдено в списку продуктів`)
        }
        res.json(result);
    }
     catch (error) {
      next(error);
    }
}

const removeProductKitchen = async (req, res, next) => {
    try {
        const {productId} = req.params;
        const result = await serviceKitchen.removeProductKitchen(productId);
        if (!result) {
            throw HttpError(404, `Такий товар не знайдено в списку продуктів`)
        }
        res.json({
            message: 'Успішно видалено'
        });
    }
     catch (error) {
      next(error);
    }
  }

module.exports={
    getAllKitchen,
    getProductKitchen,
    updateProductKitchen,
    addProductKitchen,
    removeProductKitchen
}