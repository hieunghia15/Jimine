const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Type = new Schema(
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
    Color:{
      type: String,
    },
    isType: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Types", Type);
