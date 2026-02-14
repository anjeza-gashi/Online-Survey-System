const surveyService = require("../services/survey.service");

const createSurvey = (async (req, res) => {
    try {
        const { title, description, isActive, questions } = req.body;
        const survey = await surveyService.createSurvey({
            title,
            description,
            createdBy: req.user.id,
            isActive,
            questions
        });
        res.status(201).json({ survey });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

const getAllSurveys = async (req, res) => {
    try {
        const surveys = await surveyService.getAllSurveys();
        res.status(200).json({ surveys });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getSurveyById = async (req, res) => {
    try {
        const survey = await surveyService.getSurveyById(req.params.id);
        res.status(200).json({ survey });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateSurvey = async (req, res) => {
    try {
        const updatedSurvey = await surveyService.updateSurvey(
            req.params.id, req.body, req.user.id
        );

        res.status(200).json(updatedSurvey);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteSurvey = async (req, res) => {
    try {
        const deletedSurvey = await surveyService.deleteSurvey(req.params.id, req.user.id);
        res.status(200).json({ message: "Survey deleted successfully", survey: deletedSurvey });
    } catch (err) {
        if (err.message === "Not authorized") {
            return res.status(403).json({ message: err.message });
        }
        return res.status(500).json({ message: "Server error" });
    }
};

const addQuestion = async (req, res) => {
    try {
        const survey = await surveyService.addQuestion(req.params.surveyId, req.body, req.user.id);
        res.status(201).json(survey);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateQuestion = async (req, res) => {
    try {
        const survey = await surveyService.updateQuestion(
            req.params.surveyId,
            req.params.questionId,
            req.body,
            req.user.id
        );
        res.status(200).json(survey);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteQuestion = async (req, res) => {
    try {
        const survey = await surveyService.deleteQuestion(
            req.params.surveyId,
            req.params.questionId,
            req.user.id
        );
        res.status(200).json(survey);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createSurvey,
    getAllSurveys,
    getSurveyById,
    updateSurvey,
    deleteSurvey,
    addQuestion,
    updateQuestion,
    deleteQuestion
}