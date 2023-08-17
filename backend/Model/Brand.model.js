const mongoose = require("mongoose");

const brnadSchema = new mongoose.Schema({
    brandName : String,
});

const Brand = mongoose.model("Brand",brnadSchema);

module.exports = Brand