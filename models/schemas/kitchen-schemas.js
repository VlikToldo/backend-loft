const mongoose = require('mongoose');
const Schemas = mongoose.Schema;

const productKitchen = new Schemas(
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
    souse: {
      type: String,
      default: ""
    },
    alergents: {
      type: String,
      default: ""
    }
  },
  { versionKey: false, timestamps: true }
);

const ProductKitchen = mongoose.model('productKitchen', productKitchen);

module.exports = ProductKitchen;
