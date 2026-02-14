const User = require("../models/User")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const generateToken = (userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
}

const register = async (name, email, password) => {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
        throw new Error("User already exists");
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        name: name,
        email: email,
        password: hashPassword,
    })
    await newUser.save()
    return {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
    };
}

const login = async (email, password) => {
    const user = await User.findOne({ email: email });

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
        token: generateToken(user._id)
    };
}

const updateProfile = async (userId, updateData) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    if (updateData.email) {
        throw new Error("Email can't be changed");
    }

    if (updateData.password) {
        const hashedPassword = await bcrypt.hash(updateData.password, 10);
        user.password = hashedPassword;
        delete updateData.password;
    }

    if (updateData.name) {
        user.name = updateData.name;
    }

    await user.save();

    return {
        _id: user._id,
        name: user.name,
        email: user.email
    };
};

const getProfile = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};


module.exports = {
    register, login, updateProfile, getProfile
}