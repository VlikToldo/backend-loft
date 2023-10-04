const mongoose = require('mongoose');
const Schemas = mongoose.Schema;

const productBar = new Schemas(
  {
    name: {
      type: String,
      required: [true, 'Set name for product'],
    },
    igredients: {
      type: String,
    },
    alcohol: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const ProductBar = mongoose.model('productBar', productBar);

module.exports = ProductBar;
