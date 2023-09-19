const express = require("express");

const router = express.Router();

const data = require('../../data.json')

router.get("/", (req, res)=> {
    res.send(data)
 });

router.get("/:productId", (req, res, next) => {

} )

 module.exports = router;