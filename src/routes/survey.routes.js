const express = require('express');
const route = express.Router();
const surveyController = require("../controllers/survey.controller");
const { auth } = require("../middleware/auth");
const { createSurveyValidator } = require('../validators/survey.validator');

route.post('/', auth, createSurveyValidator, surveyController.createSurvey);
route.get('/', surveyController.getAllSurveys);
route.get('/:id', surveyController.getSurveyById);
route.patch('/:id', auth, surveyController.updateSurvey);
route.delete('/:id', auth, surveyController.deleteSurvey);

// Question routes
route.post('/:surveyId/questions', auth, surveyController.addQuestion);
route.patch('/:surveyId/questions/:questionId', auth, surveyController.updateQuestion);
route.delete('/:surveyId/questions/:questionId', auth, surveyController.deleteQuestion);

module.exports = route;