const express = require('express');
const route = express.Router();
const userController = require("../controllers/user.controller");
const { registerValidator, loginValidator } = require('../validators/user.validator');

route.post('/register', registerValidator, userController.register);
route.post('/login', loginValidator, userController.login);
module.exports = route;