const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Status = new Schema(
    {
        Name: {
            type: String,
            trim: true,
            unique: true,
        },
        Description: {
            type: String,
            required: true,
        },
        Stt: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Statuses", Status);
