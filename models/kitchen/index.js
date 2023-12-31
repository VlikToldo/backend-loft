const ProductKitchen = require('../schemas/kitchen-schemas');

const getAllKitchen = async () => {
  return ProductKitchen.find();
};

const getProductKitchen = async (productId) => {
  return ProductKitchen.findOne({ _id: productId });
};

const addProductKitchen = async body => {
  return ProductKitchen.create(body);
};

const editProductKitchen = async (productId, body) => {
  return ProductKitchen.findByIdAndUpdate({ _id: productId }, body, { new: true });
};

const removeProductKitchen = async productId => {
  return ProductKitchen.findByIdAndRemove({ _id: productId });
};

module.exports = {
  getAllKitchen,
  getProductKitchen,
  addProductKitchen,
  editProductKitchen,
  removeProductKitchen,
};
