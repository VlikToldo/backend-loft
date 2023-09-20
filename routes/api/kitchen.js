const express = require("express");

const kitchenControllers = require('../../contollers/kitchen-controller')

const router = express.Router();


router.get("/", kitchenControllers.getAllKitchen);

router.get("/:name", kitchenControllers.getProductKitchen);

router.post("/", kitchenControllers.addProductKitchen);

router.put("/:productId", kitchenControllers.updateProductKitchen);

router.delete("/:productId", kitchenControllers.removeProductKitchen);

 module.exports = router;