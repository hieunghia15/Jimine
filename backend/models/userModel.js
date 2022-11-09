const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
    {
        Fullname: {
            type: String,
            trim: true,
        },
        Email: {
            type: String,
            required: true,
            unique: true,
        },
        Password: {
            type: String,
            required: true,
        },
        Birthday: {
            type: String,
        },
        Gender: {
            type: String,
        },
        Address: {
            type: String,
        },
        Phone: {
            type: String,
            require: true,
        },
        Role: {
            type: Number,
            default: 0,
        },
        Avatar:{
            type:String,
        },
        Company:{
            type:String,
        },
        Department:{
            type:String,
        },
        Position:{
            type:String,
        },
        Partners:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Users"
        }]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Users", User);
