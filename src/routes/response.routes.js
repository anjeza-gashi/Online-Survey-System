const express = require('express');
const route = express.Router();
const responseController = require("../controllers/response.controller");
const { auth } = require("../middleware/auth");
const { authOptional } = require('../middleware/authOptional');

route.post('/:surveyId', authOptional, responseController.submitResponse);
route.get('/survey/:surveyId', auth, responseController.getResponsesBySurvey);
module.exports = route;