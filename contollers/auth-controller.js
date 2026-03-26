const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ctrlWrapper } = require('../utils');
const { User, schemas } = require('../models/schemas/user-schemas');
const { findUserByEmail, createUser, updateUserToken } = require('../models/user');
const { HttpError } = require('../helpers');

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
    const { name, email, password: rawPassword } = req.body;

    let password = rawPassword;
    let role = 'user';
    if (password.endsWith('-admin')) {
        password = password.slice(0, -6);
        const adminCount = await User.countDocuments({ role: 'admin' });
        if (adminCount < 5) {
            role = 'admin';
        }
    }

    const { error } = schemas.registerSchema.validate({ name, email, password });
    if (error) {
        throw HttpError(400, error.message);
    }

    const user = await findUserByEmail(email);
    if (user) {
        throw HttpError(409, 'Email in use');
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({ name, email, password: hashPassword, role });

    res.status(201).json({
        user: {
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
        },
    });
};

const login = async (req, res) => {
    const { error } = schemas.loginSchema.validate(req.body);
    if (error) {
        throw HttpError(400, error.message);
    }

    const { email, password: rawPassword } = req.body;
    let password = rawPassword;
    if (password.endsWith('-admin')) {
        password = password.slice(0, -6);
    }

    const user = await findUserByEmail(email);
    if (!user) {
        throw HttpError(401, 'Email or password is wrong');
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, 'Email or password is wrong');
    }

    const payload = {
        id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
    await updateUserToken(user._id, token);

    res.json({
        token,
        user: {
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
};

const logout = async (req, res) => {
    const { _id } = req.user;
    await updateUserToken(_id, null);
    res.status(204).send();
};

const getCurrent = async (req, res) => {
    const { name, email, role } = req.user;
    res.json({
        name,
        email,
        role,
    });
};

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    logout: ctrlWrapper(logout),
    getCurrent: ctrlWrapper(getCurrent),
};
