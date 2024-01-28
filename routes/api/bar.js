const express = require('express');

const upload = require('../../middlewares/upload');
const barControllers = require('../../contollers/bar-controller');

const router = express.Router();

router.get('/', barControllers.getAllBar);

router.get('/:productId', barControllers.getProductBar);

router.post('/', upload.single("image"),  barControllers.addProductBar);

router.put('/:productId', barControllers.updateProductBar);

router.delete('/:productId', barControllers.removeProductBar);

module.exports = router;
