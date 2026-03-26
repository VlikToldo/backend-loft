const { User } = require('../schemas/user-schemas');

const findUserByEmail = async email => {
    return User.findOne({ email });
};

const createUser = async body => {
    return User.create(body);
};

const updateUserToken = async (id, token) => {
    return User.findByIdAndUpdate(id, { token }, { new: true });
};

const findUserById = async id => {
    return User.findById(id);
};

module.exports = {
    findUserByEmail,
    createUser,
    updateUserToken,
    findUserById,
};
