const fs = require('fs/promises');
const path = require('path'); 

const dataPath = path.join(__dirname, '../../data.json');

const getAllKitchen = async (name) => {
    const data = await fs.readFile(dataPath);
    return JSON.parse(data);
}

module.exports = {
    getAllKitchen
};