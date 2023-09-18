const express = require("express");

const router = express.Router();

const service = require('../../models/bar')

router.get("/", async(req,res) => {
    const result = await service.getAllBar();
    res.status(200).json(result);
});

// router.get("/:id", (req, res)=> {
//     res.json([{}])
//  });

 module.exports = router;