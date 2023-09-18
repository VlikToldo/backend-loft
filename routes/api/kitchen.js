const express = require("express");

const router = express.Router();

const data = require('../../data.json')

router.get("/", (req, res)=> {
    res.send(data)
 });

// router.get("/:id", (req, res)=> {
//     res.json([{}])
//  });

 module.exports = router;