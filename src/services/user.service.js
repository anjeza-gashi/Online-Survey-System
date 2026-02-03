const User = require("../models/User")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const generateToken = (userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
}

const register = async (name, email, password, role = "user") => {
    const userExists = await findUser(email);
    if (userExists) {
        throw new Error("User already exists");
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        name: name,
        email: email,
        password: hashPassword,
        role: role
    })
    await newUser.save()
    return {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        token: generateToken(newUser._id)
    };
}

const login = async (email, password) => {
    const user = await findUser(email);

    if (!user) {
        throw new Error("User does not exist");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
    };
}

const findUser = async (email) => {
    const user = User.findOne({ email: email });
    return user;
}

module.exports = {
    register, login, findUser
}