const express = require("express");

const barControllers = require('../../contollers/bar-controller');

const router = express.Router();


router.get("/", barControllers.getAllBar);

router.get("/:name", barControllers.getProductBar);

router.post("/", barControllers.addProductBar);

router.put("/:productId", barControllers.updateProductBar);

router.delete("/:productId", barControllers.removeProductBar);

module.exports = router;
