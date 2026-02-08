const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["text", "single-choice", "multiple-choice"],
        required: true,
    },
    options: {
        type: [String],
        validate: {
            validator: function (value) {
                if (this.type === "text") return value.length === 0;
                return value.length >= 2;
            },
            message: "Choice questions must have at least 2 options",
        },
    },
    required: {
        type: Boolean,
        default: false,
    },
});


const surveySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        isActive: {
            type: Boolean,
            default: false,
        },

        questions: [questionSchema],
    },
    { timestamps: true }
);

const Survey = mongoose.model("Survey", surveySchema);
module.exports = Survey;