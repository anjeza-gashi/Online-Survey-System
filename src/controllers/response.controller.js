const responseService = require('../services/response.service');

const submitResponse = async (req, res) => {
    try {
        const surveyId = req.params.surveyId;
        const userId = req.user ? req.user.id : null;
        const { answers } = req.body;

        const response = await responseService.submitResponse(surveyId, answers, userId);
        res.status(201).json(response);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getResponsesBySurvey = async (req, res) => {
    try {
        const surveyId = req.params.surveyId;
        const responses = await responseService.getResponsesBySurvey(surveyId);
        res.status(200).json(responses);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    submitResponse,
    getResponsesBySurvey,
    getResponsesByUser
};
