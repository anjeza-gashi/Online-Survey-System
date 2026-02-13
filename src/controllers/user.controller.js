const userService = require("../services/user.service");

const register = (async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await userService.register(name, email, password);
        res.status(201).json({ user });
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userService.login(email, password);
        res.status(200).json({ user });
    }
    catch (err) {
        res.status(401).json({ message: err.message });
    }
}

const getProfile = async (req, res) => {
    try {
        const user = await userService.getProfile(req.user.id);
        res.status(200).json({ user });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

const updateProfile = async (req, res) => {
    try {
        const updatedUser = await userService.updateProfile(req.user.id, req.body);
        res.status(200).json({ user: updatedUser });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    register, login, getProfile, updateProfile
}