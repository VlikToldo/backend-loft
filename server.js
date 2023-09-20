const mongoose = require('mongoose')

const app = require("./index.js");

const DB_HOST = 'mongodb+srv://Valik:ovQsdJfO6tkjVEZB@cluster0.yad9p7j.mongodb.net/loft-menu?retryWrites=true&w=majority'

mongoose.connect(DB_HOST)
    .then(() => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
        process.exit(1)
    }) 
