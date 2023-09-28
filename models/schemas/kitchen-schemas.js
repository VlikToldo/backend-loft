const mongoose = require('mongoose');
const Schemas = mongoose.Schema;

const productKitchen = new Schemas(
  {
    name: {
      type: String,
      required: [true, 'Set name for product'],
    },
    ingredients: {
      type: String,
      required: [true, 'Set name for product'],
    },
    sous: {
      type: String
    },
    alergents: {
      type: String
    }
  },
  { versionKey: false, timestamps: true }
);

const ProductKitchen = mongoose.model('productKitchen', productKitchen);

module.exports = ProductKitchen;


    // type: {
    //   type: String,
    //   required: [true, 'Set type for product'],
    // },
    // name: {
    //   type: String,
    //   required: [true, 'Set name for product'],
    // },