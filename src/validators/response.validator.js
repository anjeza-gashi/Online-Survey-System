const { body, param } = require("express-validator");
const validate = require('../middleware/validate');

const submitResponseValidator = [
    param("surveyId")
        .isMongoId().withMessage("Invalid survey ID"),

    body("answers")
        .isArray({ min: 1 })
        .withMessage("Answers must be a non-empty array"),

    body("answers.*.questionId")
        .isMongoId().withMessage("Invalid question ID"),

    body("answers.*.value")
        .notEmpty().withMessage("Answer value is required"),
    validate
];

module.exports = { submitResponseValidator };
