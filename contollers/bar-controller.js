const Joi = require('joi');

const serviceBar = require("../../models/bar");

const {HttpError} = require('../helpers');

const AddSchema = Joi.object({
    name: Joi.string().required(),
    ingridients: Joi.string(),
});

const getAllBar = async (req, res, next) => {
    try {
      const result = await serviceBar.getAllBar();
      res.status(200).json(result);
    }
     catch (error) {
      next(error);
    }
}

const getProductBar =  async(req, res, next)=> {
    try {
        const {name} = req.params;
        const result = await serviceBar.getProductBar(name);
        if (!result) {
            throw HttpError(404, `Позицію з назвою ${name} не знайдено!`)
        }
        res.status(200).json(result);
      }
       catch (error) {
        next(error);
      }
 }

const addProductBar = async (req, res, next) => {
    try {
      const {error} = AddSchema.validate(req.body);
      if (error) {
        throw HttpError(404, error.message)
      }
      const result = await serviceBar.addProductBar(req.body);
      res.status(201).json(result);
    }
     catch (error) {
      next(error);
    }
  }

const updateProductBar = async (req, res, next) => {
    try {
        const {productId} = req.params;
        const result = await serviceBar.updateProductBar(productId, req.body);
        if (!result) {
            throw HttpError(404, `Такий товар не знайдено в списку продуктів`)
        }
        res.json(result);
    }
     catch (error) {
      next(error);
    }
  }

const removeProductBar = async (req, res, next) => {
    try {
        const {productId} = req.params;
        const result = await serviceBar.removeProductBar(productId);
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



module.exports = {
    getAllBar,
    getProductBar,
    addProductBar,
    updateProductBar,
    removeProductBar
}