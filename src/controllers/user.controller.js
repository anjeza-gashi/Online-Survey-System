const userService = require("../services/user.service");

const register = (async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const user = await userService.register(name, email, password, role);
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

module.exports = {
    register, login
}