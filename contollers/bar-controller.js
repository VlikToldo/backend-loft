const Joi = require('joi');
const { ctrlWrapper } = require('../utils');
const serviceBar = require('../models/bar');
const path = require("path");
const fs = require("fs/promises");

const imagesPath = path.resolve("public", "position");

const { HttpError } = require('../helpers');


const AddSchema = Joi.object({
  type: Joi.string().required(),
  ceh: Joi.string().required(),
  name: Joi.string().required(),
  ingredients: Joi.string().allow(''),
  alcohol: Joi.string().allow(''),
  image: Joi.string().allow('')
});

const getAllBar = async (req, res, next) => {
  const result = await serviceBar.getAllBar();
  res.status(200).json(result);
};

const getProductBar = async (req, res, next) => {
  const { productId } = req.params;
  const result = await serviceBar.getProductBar(productId);
  if (!result) {
    throw HttpError(404, `Позицію з ID ${productId} не знайдено!`);
  }
  res.status(200).json(result);
};

const addProductBar = async (req, res, next) => {
  const { error } = AddSchema.validate(req.body);
  if (error) {
    throw HttpError(404, error.message);
  }
  console.log(req.file);
  const {path: oldPath, filename} = req.file;
  const newPath = path.join(imagesPath, filename);
  await fs.rename(oldPath, newPath);
  const position = path.join("position", filename)
 
  const result = await serviceBar.addProductBar({...req.body, image: position});
  res.status(201).json(result);
};

const updateProductBar = async (req, res, next) => {
  const { productId } = req.params;
  const result = await serviceBar.updateProductBar(productId, req.body);
  if (!result) {
    throw HttpError(404, `Такий товар не знайдено в списку продуктів`);
  }
  res.json(result);
};

const removeProductBar = async (req, res, next) => {
  const { productId } = req.params;
  const result = await serviceBar.removeProductBar(productId);
  if (!result) {
    throw HttpError(404, `Такий товар не знайдено в списку продуктів`);
  }
  res.json({
    message: 'Успішно видалено',
  });
};

module.exports = {
  getAllBar: ctrlWrapper(getAllBar),
  getProductBar: ctrlWrapper(getProductBar),
  addProductBar: ctrlWrapper(addProductBar),
  updateProductBar: ctrlWrapper(updateProductBar),
  removeProductBar: ctrlWrapper(removeProductBar),
};
