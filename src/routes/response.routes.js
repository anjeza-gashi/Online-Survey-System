const express = require('express');
const route = express.Router();
const responseController = require("../controllers/response.controller");
const { auth, authOptional } = require("../middleware/auth");
const { submitResponseValidator } = require('../validators/response.validator');

route.post('/:surveyId', authOptional, submitResponseValidator, responseController.submitResponse);
route.get('/survey/:surveyId', auth, responseController.getResponsesBySurvey);
module.exports = route;