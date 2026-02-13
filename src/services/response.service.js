const Response = require('../models/Response');
const Survey = require('../models/Survey');

const submitResponse = async (surveyId, answers, userId = null) => {
    const survey = await Survey.findById(surveyId);
    if (!survey) throw new Error('Survey not found');
    if (!survey.isActive) throw new Error('Survey is not active');

    const questionMap = new Map();
    survey.questions.forEach(q => questionMap.set(q._id.toString(), q));

    const answeredQuestionIds = new Set();

    for (const a of answers) {
        if (answeredQuestionIds.has(a.questionId)) {
            throw new Error(`Question "${questionMap.get(a.questionId)?.text || a.questionId}" has already been answered.`);
        }
        answeredQuestionIds.add(a.questionId);

        const question = questionMap.get(a.questionId);
        if (!question) throw new Error(`Invalid question ID: ${a.questionId}`);

        switch (question.type) {
            case 'single-choice':
                if (!question.options.includes(a.value)) {
                    throw new Error(`Invalid answer for question "${question.text}". Must be one of: ${question.options.join(', ')}`);
                }
                break;
            case 'multiple-choice':
                const invalidOptions = a.value.filter(opt => !question.options.includes(opt));
                if (invalidOptions.length > 0) {
                    throw new Error(`Invalid answer(s) for question "${question.text}": ${invalidOptions.join(', ')}`);
                }
                break;
            case 'text':
                if (typeof a.value !== 'string') {
                    throw new Error(`Answer for question "${question.text}" must be a string`);
                }
                break;
            default:
                throw new Error(`Unsupported question type: ${question.type}`);
        }
    }

    for (const q of survey.questions) {
        if (q.required && !answeredQuestionIds.has(q._id.toString())) {
            throw new Error(`Question "${q.text}" is required.`);
        }
    }

    const answersWithText = answers.map(a => {
        const question = questionMap.get(a.questionId);
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
