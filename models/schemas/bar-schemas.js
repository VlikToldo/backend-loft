const mongoose = require('mongoose');
const Schemas = mongoose.Schema;

const productBar = new Schemas(
  {
    type: {
      type: String,
      required: [true, 'Set name for product'],
    },
    ceh: {
      type: String,
      required: [true, 'Set name for product'],
    },
    name: {
      type: String,
      required: [true, 'Set name for product'],
    },
    ingredients: {
      type: String,
      default: ""
    },
    amount: {
      type: String,
      default: ""
    },
    alcohol: {
      type: String,
      default: ""
    },    
    description: {
      type: String,
      default: ""
    },
    image: {
      type: String,
      default: ""
    },
  },
  { versionKey: false, timestamps: true }
);

const ProductBar = mongoose.model('productBar', productBar);

module.exports = ProductBar;
