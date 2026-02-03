const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    value: mongoose.Schema.Types.Mixed,
});

const responseSchema = new mongoose.Schema(
    {
        survey: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Survey",
            required: true,
        },

        submittedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        answers: [answerSchema],

        submittedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const Response = mongoose.model("Response", responseSchema);
module.exports = Response;