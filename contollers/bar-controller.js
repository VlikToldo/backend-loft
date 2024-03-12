const Joi = require('joi');
const fs = require('fs');
const { ctrlWrapper } = require('../utils');
const serviceBar = require('../models/bar');
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
    country: Joi.string().allow(''),
    ingredients: Joi.string().allow(''),
    amount: Joi.string().allow(''),
    alcohol: Joi.string().allow(''),
    description: Joi.string().allow(''),
    image: Joi.string().allow(''),
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

    let addObj = { ...req.body };
    if (req.file) {
        const { path: filePath, filename } = req.file;

        const result = await uploadFile(process.env.BUCKET_NAME, filePath, filename);
        addObj = { ...addObj, image: result[0].id };

        if (fs.existsSync(filePath)) {
            // Видаляємо файл з тимчасової папки після завантаження на сервер
            fs.unlink(filePath, err => {
                if (err) {
                    console.error('Помилка видалення файлу з тимчасової папки:', err);
                } else {
                    console.log('Файл успішно видалено');
                }
            });
        } else {
            console.error('Файл не знайдено');
        }
    }
    const result = await serviceBar.addProductBar({ ...addObj });
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
    const updatedProducts = await serviceBar.getAllBar();
    res.json({
        message: 'Успішно видалено',
        products: updatedProducts,
    });
};

module.exports = {
    getAllBar: ctrlWrapper(getAllBar),
    getProductBar: ctrlWrapper(getProductBar),
    addProductBar: ctrlWrapper(addProductBar),
    updateProductBar: ctrlWrapper(updateProductBar),
    removeProductBar: ctrlWrapper(removeProductBar),
};

// Функція для завантаження файлу на Google Диск
// const { google } = require('googleapis');
// const googleKey = require('/etc/secrets/service-account-key.json');

// const SCOPE = ['https://www.googleapis.com/auth/drive'];

// const authorize = async () => {
//     const auth = new google.auth.JWT(googleKey.client_email, null, googleKey.private_key, SCOPE);
//     await auth.authorize();
//     return auth;
// };

// const uploadFile = async (authClient, filePath, filename, mimetype) => {
//     console.log(filename);
//     return new Promise((resolve, reject) => {
//         const drive = google.drive({ version: 'v3', auth: authClient });

//         const fileMetaData = {
//             name: filename,
//             parents: ['1WqcxMFLPmAtkRXekcbK-kFLeO0bGxEtl'],
//         };

//         drive.files.create(
//             {
//                 resource: fileMetaData,
//                 media: {
//                     mimeType: mimetype,
//                     body: fs.createReadStream(filePath),
//                 },
//                 fields: 'id',
//             },
//             (err, file) => {
//                 if (err) {
//                     console.error('Помилка завантаження файлу на Google Диск:', err);
//                     return reject(err);
//                 }
//                 console.log(file);
//                 const fileId = file.data.id;
//                 const fileUrl = `https://drive.google.com/uc?id=${fileId}`;
//                 console.log('URL завантаженого файлу:', fileUrl);
//                 resolve(fileUrl);
//             }
//         );
//     });
// };
