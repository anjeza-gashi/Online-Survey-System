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
    body("questions.*")
        .custom((question) => {
            if (question.type === "text") {

                if (question.options && question.options.length > 0) {
                    throw new Error("Text questions must not have options");
                }

            }
            if (
                question.type === "single-choice" ||
                question.type === "multiple-choice"
            ) {

                if (!Array.isArray(question.options)) {
                    throw new Error("Choice questions must have options array");
                }

                if (question.options.length < 2) {
                    throw new Error("Choice questions must have at least 2 options");
                }

                for (const option of question.options) {
                    if (typeof option !== "string" || option.trim() === "") {
                        throw new Error("Options must be non-empty strings");
                    }
                }

            }

            return true;
        }),
    body("questions.*.required").optional().isBoolean(),
    validate
];

module.exports = { createSurveyValidator };