const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    email : String,
    password : String,
    username : String
});

const Register = mongoose.model("Register",authSchema);

module.exports = Register