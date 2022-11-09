const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Project = new Schema(
    {
        Name: {
            type: String,
            trim: true,
        },
        Key: {
            type: String,
            trim: true,
        },
        TaskCounter: {
            type: Number
        },
        Category: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Types"
        },
        Description: {
            type: String,
        },
        User_ID: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Users"
        },
        Member: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Users"
        }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Projects", Project);
