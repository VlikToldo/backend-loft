const express = require('express');

const upload = require('../../middlewares/upload');
const kitchenControllers = require('../../contollers/kitchen-controller');

const router = express.Router();

router.get('/', kitchenControllers.getAllKitchen);

router.get('/:productId', kitchenControllers.getProductKitchen);
router.get('/id/:id', kitchenControllers.getProductKitchen);

router.post('/', upload.single('image'), kitchenControllers.addProductKitchen);

router.put('/:productId', upload.single('image'), kitchenControllers.updateProductKitchen);
router.put('/id/:id', upload.single('image'), kitchenControllers.updateProductKitchen);

router.delete('/:productId', kitchenControllers.removeProductKitchen);
router.delete('/id/:id', kitchenControllers.removeProductKitchen);

module.exports = router;
