const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TotalTasksByStatus = new Schema(
    {
        Project_ID: {
            type: String,
            required: true,
        },
        Total_Tasks: {
            type: Array,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Total_Tasks_By_Statuses", TotalTasksByStatus);
