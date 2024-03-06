const Joi = require('joi');
const fs = require('fs');
const { ctrlWrapper } = require('../utils');
const serviceKitchen = require('../models/kitchen');
const { HttpError } = require('../helpers');
const { Storage } = require('@google-cloud/storage');
require('dotenv').config();

// Функція для завантаження файлу на Google Storage
const projectId = process.env.PROJECT_ID;
const keyFilename = process.env.KEYFILENAME;

const storage = new Storage({ projectId, keyFilename });

const uploadFile = async (bucketName, file, fileOutputName) => {
    try {
        const bucket = storage.bucket(bucketName);
        const result = await bucket.upload(file, {
            destination: fileOutputName,
            public: true,
        });
        return result;
    } catch (error) {
        console.log('Error', error);
    }
};


const AddSchema = Joi.object({
  type: Joi.string().required(),
  ceh: Joi.string().required(),
  name: Joi.string().required(),
  ingredients: Joi.string().allow(''),
  souse: Joi.string().allow(''),
  allergens: Joi.string().allow(''),
  image: Joi.string().allow('')
});

const getAllKitchen = async (req, res, next) => {
  const result = await serviceKitchen.getAllKitchen();
  res.status(200).json(result);
};

const getProductKitchen = async (req, res, next) => {
  const { productId } = req.params;
  const result = await serviceKitchen.getProductKitchen(productId);
  if (!result) {
    throw HttpError(404, `Позицію з ID${productId} не знайдено!`);
  }
  res.status(200).json(result);
};

const addProductKitchen = async (req, res, next) => {
  const { error } = AddSchema.validate(req.body);
  if (error) {
    throw HttpError(404, error.message);
  }
  let addObj = {...req.body};
  if (req.file) {
    if (req.file) {
      const { path: filePath, filename } = req.file;

      const result = await uploadFile(process.env.BUCKET_NAME, filePath, filename);
      addObj = { ...addObj, image: result[0].id };

      if (fs.existsSync(filePath)) {
          // Видаляємо файл з тимчасової папки після завантаження на сервер
          fs.unlink(filePath, err => {
              if (err) {
                  console.error('Помилка видалення файлу:', err);
              } else {
                  console.log('Файл успішно видалено');
              }
          });
      } else {
          console.error('Файл не знайдено');
      }
  }
  }
  const result = await serviceKitchen.addProductKitchen({...addObj});
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
  const updatedProducts = await serviceKitchen.getAllKitchen();
  res.status(200).json({
    message: 'Успішно видалено',
    products: updatedProducts
  });
};

module.exports = {
  getAllKitchen: ctrlWrapper(getAllKitchen),
  getProductKitchen: ctrlWrapper(getProductKitchen),
  updateProductKitchen: ctrlWrapper(updateProductKitchen),
  addProductKitchen: ctrlWrapper(addProductKitchen),
  removeProductKitchen: ctrlWrapper(removeProductKitchen),
};
