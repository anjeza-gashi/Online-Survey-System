const Response = require('../models/Response');
const Survey = require('../models/Survey');

const submitResponse = async (surveyId, answers, userId = null) => {
    const survey = await Survey.findById(surveyId);
    if (!survey) throw new Error('Survey not found');

    const questionIds = survey.questions.map(q => q._id.toString());
    answers.forEach(a => {
        if (!questionIds.includes(a.questionId)) {
            throw new Error(`Invalid question ID: ${a.questionId}`);
        }

        const question = survey.questions.id(a.questionId);

        if (question.type === 'single-choice') {
            if (!question.options.includes(a.value)) {
                throw new Error(`Invalid answer for question "${question.text}". Must be one of the provided options.`);
            }
        }

        if (question.type === 'multiple-choice') {
            const invalidOptions = a.value.filter(opt => !question.options.includes(opt));
            if (invalidOptions.length > 0) {
                throw new Error(`Invalid answer(s) for question "${question.text}": ${invalidOptions.join(', ')}`);
            }
        }
    });

    survey.questions.forEach(q => {
        if (q.required && !answers.find(a => a.questionId === q._id.toString())) {
            throw new Error(`Question "${q.text}" is required.`);
        }
    });

    const answersWithText = answers.map(a => {
        const question = survey.questions.id(a.questionId);
        return { ...a, questionText: question.text };
    });

    const response = new Response({
        survey: surveyId,
        submittedBy: userId,
        answers: answersWithText
    });

    await response.save();
    return response;
};

const getResponsesBySurvey = async (surveyId, userId) => {
    const survey = await Survey.findById(surveyId);

    if (!survey) throw new Error("Survey not found");

    if (survey.createdBy.toString() !== userId.toString()) {
        throw new Error("Not authorized to view responses");
    }

    return Response.find({ survey: surveyId })
        .populate('submittedBy', 'name');
};


module.exports = {
    submitResponse,
    getResponsesBySurvey,
};
