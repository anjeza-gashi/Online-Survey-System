const Survey = require("../models/Survey");

const createSurvey = async ({ title, description, createdBy, isActive, questions }) => {
    const newSurvey = new Survey({
        title: title,
        description: description,
        createdBy: createdBy,
        isActive: isActive,
        questions: questions
    })

    await newSurvey.save();
    return newSurvey;
}

const getAllSurveys = async () => {
    const surveys = await Survey.find().populate("createdBy", "name");;
    if (!surveys) {
        throw new Error("There are no surveys available!");
    }
    return surveys;
}

const getSurveyById = async (surveyId) => {
    const survey = await Survey.findById(surveyId).populate("createdBy", "name");
    if (!survey) {
        throw new Error("Survey not found");
    }
    return survey;
}

const updateSurvey = async (surveyId, updatedData, userId) => {
    const survey = await Survey.findById(surveyId);

    if (!survey) throw new Error("Survey not found");

    if (survey.createdBy.toString() !== userId) throw new Error("Not authorized");

    Object.assign(survey, updatedData);
    await survey.save();
    return survey;
}

const deleteSurvey = async (surveyId, userId) => {
    const survey = await Survey.findById(surveyId);

    if (!survey) throw new Error("Survey not found");

    if (survey.createdBy.toString() !== userId) throw new Error("Not authorized");

    await survey.remove();
    return survey;
}

const addQuestion = async (surveyId, questionData, userId) => {
    const survey = await Survey.findById(surveyId);
    if (!survey) throw new Error("Survey not found");
    if (survey.createdBy.toString() !== userId) throw new Error("Not authorized");

    survey.questions.push(questionData);
    await survey.save();
    return survey;
};

const updateQuestion = async (surveyId, questionId, questionData, userId) => {
    const survey = await Survey.findById(surveyId);
    if (!survey) throw new Error("Survey not found");
    if (survey.createdBy.toString() !== userId) throw new Error("Not authorized");

    const question = survey.questions.id(questionId);
    if (!question) throw new Error("Question not found");

    Object.assign(question, questionData);
    await survey.save();
    return survey;
};

const deleteQuestion = async (surveyId, questionId, userId) => {
    const survey = await Survey.findById(surveyId);
    if (!survey) throw new Error("Survey not found");
    if (survey.createdBy.toString() !== userId) throw new Error("Not authorized");

    const question = survey.questions.id(questionId);
    if (!question) throw new Error("Question not found");

    survey.questions.pull(questionId);
    await survey.save();
    return survey;
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