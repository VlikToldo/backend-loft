const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require('dotenv').config();

const barRouter = require("./routes/api/bar.js");
const kitchenRouter = require("./routes/api/kitchen.js");

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"))

app.use("/api/bar", barRouter);
app.use("/api/kitchen", kitchenRouter);

app.use((req, res) => {
    req.status(404).json({
        message: "Not Found"
    })
});

app.use((err, req, res, next)=> {
    const {status = 500, message = "Server error"} = err;
    res.status(status).json({message});
});

module.exports = app;



