const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Issue = new Schema(
    {
        Project_ID: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Projects"
        },
        Type_ID: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Types"
        },
        Status_ID: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Statuses"
        },
        UpdateStatusAt: {
            type: Date
        },
        Summary: {
            type: String,
        },
        Description: {
            type: String,
        },
        Attachment: [{
            type: String,
        }],
        Key: {
            type: String
        },
        User_ID: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Users"
        },
        Deadline: {
            type: Date
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Issues", Issue);
