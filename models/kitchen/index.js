const fs = require('fs/promises');
const path = require('path'); 
const {nanoid} = require('nanoid')

const dataPath = path.join(__dirname, '../../data.json');

const updateProductsKitchen = async (product) => await fs.writeFile(dataPath, JSON.stringify(product, null, 2));

const getAllKitchen = async () => {
    const data = await fs.readFile(dataPath);
    return JSON.parse(data);
}

const getProductKitchen = async (name) => {
    const products = await getAllKitchen();
    const result = products.find(item=>item.name === name)
    return result || null;
}

const addPoductKitchen = async (body) => {
    const products = await getAllKitchen();
    const newProduct = {
        productId: nanoid(),
        ...body
    };
    products.push(newProduct);
    await updateProductsKitchen(products)
    return newProduct;
}

const editProductKitchen = async (productId, body) => {
    const products = await getAllKitchen();
    const index = products.findIndex(item=>item.productId === productId);
    if (index === -1) {
        return null;
    };
    products[index] = {productId, ...body};
    updateProductsKitchen(products);
    return products[index];
}

const removeProductKitchen = async (productId) => {
    const products = await getAllKitchen();
    const index = products.findIndex(item=>item.productId === productId);
    if (index === -1) {
        return null;
    };
    const [result] = products.splice(index, 1);
    updateProductsKitchen(products);
    return result;
     
}

module.exports = {
    getAllKitchen,
    getProductKitchen,
    addPoductKitchen,
    editProductKitchen,
    removeProductKitchen
};