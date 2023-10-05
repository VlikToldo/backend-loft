const Joi = require('joi');
const { ctrlWrapper } = require('../utils');

const serviceKitchen = require('../models/kitchen');

const { HttpError } = require('../helpers');

const AddSchema = Joi.object({
  type: Joi.string().required(),
  ceh: Joi.string().required(),
  name: Joi.string().required(),
  ingredients: Joi.string().allow(''),
  souse: Joi.string().allow(''),
  alergents: Joi.string().allow(''),
});

const getAllKitchen = async (req, res, next) => {
  const result = await serviceKitchen.getAllKitchen();
  res.status(200).json(result);
};

const getProductKitchen = async (req, res, next) => {
  const { name } = req.params;
  const result = await serviceKitchen.getProductKitchen(name);
  if (!result) {
    throw HttpError(404, `Позицію з назвою ${name} не знайдено!`);
  }
  res.status(200).json(result);
};

const addProductKitchen = async (req, res, next) => {
  const { error } = AddSchema.validate(req.body);
  if (error) {
    throw HttpError(404, error.message);
  }
  const result = await serviceKitchen.addProductKitchen(req.body);
  res.status(201).json(result);
};

const updateProductKitchen = async (req, res, next) => {
  const { productId } = req.params;
  const result = await serviceKitchen.editProductKitchen(productId, req.body);
  if (!result) {
    throw HttpError(404, `Такий товар не знайдено в списку продуктів`);
  }
  res.json(result);
};

const removeProductKitchen = async (req, res, next) => {
  const { productId } = req.params;
  const result = await serviceKitchen.removeProductKitchen(productId);
  if (!result) {
    throw HttpError(404, `Такий товар не знайдено в списку продуктів`);
  }
  res.json({
    message: 'Успішно видалено',
  });
};

module.exports = {
  getAllKitchen: ctrlWrapper(getAllKitchen),
  getProductKitchen: ctrlWrapper(getProductKitchen),
  updateProductKitchen: ctrlWrapper(updateProductKitchen),
  addProductKitchen: ctrlWrapper(addProductKitchen),
  removeProductKitchen: ctrlWrapper(removeProductKitchen),
};
