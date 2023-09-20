const ProductBar = require('../schemas/bar-schemas');

const getAllBar = async () => {
  return ProductBar.find();
};

const getProductBar = async name => {
  return ProductBar.findOne({ name: name });
};

const addProductBar = async body => {
  return ProductBar.create(body);
};

const updateProductBar = async (productId, body) => {
  return ProductBar.findByIdAndUpdate({ _id: productId }, body, { new: true });
};

const removeProductBar = async productId => {
  return ProductBar.findByIdAndRemove({ _id: productId });
};

module.exports = {
  getAllBar,
  getProductBar,
  addProductBar,
  updateProductBar,
  removeProductBar,
};
