const fs = require('fs/promises');
const path = require('path'); 

const {nanoid} = require('nanoid');

const dataPath = path.join(__dirname, '../../data.json');

const updateProductsBar = async (product) => await fs.writeFile(dataPath, JSON.stringify(product, null, 2));

const getAllBar = async () => {
    const productsBar = await fs.readFile(dataPath);
    return JSON.parse(productsBar);
}

const getProductBar = async(name) => {
    const productsBar = await getAllBar();
    const result = productsBar.find(item=>item.name === name);
    return result || null;
}

const addProductBar = async(body) => {
    const productsBar = await getAllBar();
    const newProduct = {
        productId: nanoid(),
        ...body
    };
    productsBar.push(newProduct)
    await updateProductsBar(productsBar);
    return newProduct;
};

const updateProductBar = async (productId, body) => {
    const products = await getAllBar();
    const index = products.findIndex(item => item.productId === productId);
    if(index === -1){
        return null;
    }
    products[index] = { productId, ...body };
    await updateProductsBar(products);
    return products[index];
  };

const removeProductBar = async (productId) => {
    const products = await getAllBar();
    const index = products.findIndex(item => item.productId === productId);
    if(index === -1){
        return null;
    }
    const [result] = products.splice(index, 1);
    await updateProductsBar(products);
    return result;
  };


module.exports = {
    getAllBar,
    getProductBar,
    addProductBar,
    updateProductBar,
    removeProductBar
};