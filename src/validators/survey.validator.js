const { body, param } = require("express-validator");
const validate = require('../middleware/validate');

const createSurveyValidator = [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").optional().isString(),
    body("isActive").optional().isBoolean(),
    body("questions")
        .isArray({ min: 1 })
        .withMessage("Questions must be an array with at least 1 question"),
    body("questions.*.text").notEmpty().withMessage("Question text is required"),
    body("questions.*.type")
        .isIn(["text", "single-choice", "multiple-choice"])
        .withMessage("Question type must be text, single-choice, or multiple-choice"),
    body("questions.*.options")
        .custom((value, { req, path }) => {
            const type = path.includes(".type") ? value : null;
            if (Array.isArray(value)) {
                if (value.length < 2) throw new Error("Choice questions must have at least 2 options");
            }
            return true;
        })
        .optional(),
    body("questions.*.required").optional().isBoolean(),
    validate
];

module.exports = { createSurveyValidator };