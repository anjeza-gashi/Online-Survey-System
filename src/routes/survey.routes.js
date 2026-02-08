const express = require('express');
const route = express.Router();
const surveyController = require("../controllers/survey.controller");
const { auth } = require("../middleware/auth");

route.post('/createSurvey', auth, surveyController.createSurvey);
route.get('/getSurveys', surveyController.getAllSurveys);
route.get('/getSurvey/:id', surveyController.getSurveyById);
route.put('/updateSurvey/:id', auth, surveyController.updateSurvey);
route.delete('/deleteSurvey/:id', auth, surveyController.deleteSurvey);

// Question routes
route.post('/:surveyId/questions', auth, surveyController.addQuestion);
route.put('/:surveyId/questions/:questionId', auth, surveyController.updateQuestion);
route.delete('/:surveyId/questions/:questionId', auth, surveyController.deleteQuestion);

module.exports = route;