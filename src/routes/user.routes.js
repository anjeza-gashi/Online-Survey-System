const express = require('express');
const route = express.Router();
const userController = require("../controllers/user.controller");
const { registerValidator, loginValidator } = require('../validators/user.validator');
const { auth } = require('../middleware/auth');

route.post('/register', registerValidator, userController.register);
route.post('/login', loginValidator, userController.login);
route.get("/me", auth, userController.getProfile);
route.patch("/me", auth, userController.updateProfile);

module.exports = route;