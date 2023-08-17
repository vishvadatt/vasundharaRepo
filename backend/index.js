const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const mongoose = require("mongoose");
const app = express()
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json())
app.use(cors());

const vehicleRoutes = require("./Controller/Vehilce.Controller");
const BrandRoutes = require("./Controller/Brand.Controller");
const CategoryRoutes = require("./Controller/Category.Controller");
const AuthRoutes = require("./Controller/Auth.Contrller");


mongoose.connect("mongodb://localhost:27017/vasuTest",{
    useNewUrlParser :  true,
    useUnifiedTopology : true
});
const db = mongoose.Connection;

app.use("/api/Vehicle",vehicleRoutes);
app.use("/api/Brand",BrandRoutes);
app.use("/api/Category",CategoryRoutes);
app.use("/api",AuthRoutes);



app.listen(8080,() => {
    console.log("Server Running on 8080");
})