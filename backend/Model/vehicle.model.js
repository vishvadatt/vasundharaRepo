const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    vehicleName : String,
    vehicleNumber : Number,
    color : String,
    Description : String,
    brandId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Brand"
    },
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category"
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Register"
    }
});

const Vehicle = mongoose.model("vehicle",vehicleSchema);

module.exports = Vehicle