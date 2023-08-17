const router = require("express").Router();
const Category = require("../Model/Category.model");

router.post("/create-category" , async(req,res) => {
    try {
        const bodyData = req.body;
        const brand = new Category(bodyData);
        const result = await brand.save();
        res.status(200).json(result);
    } catch (e) {
        console.log("e..",e);
    }
})

router.get("/getAllCategory" , async(req,res) => {
    try {
        const result = await Category.find();
        res.status(200).json(result);
    } catch (e) {
        console.log("e..",e);
    }
})

router.get("/findOne-category/:id" , async(req,res) => {
    try {
        const id = req.params.id;
        const result = await Category.findById(id);
        res.status(200).json(result);
    } catch (e) {
        console.log("e..",e);
    }
})

router.put("/Edit-category/:id" , async(req,res) => {
    try {
        const id = req.params.id;
        const result = await Category.findByIdAndUpdate(id,req.body,{new : true});
        res.status(200).json(result);
    } catch (e) {
        console.log("e..",e);
    }
})

router.delete("/delete-category/:id" , async(req,res) => {
    try {
        const id = req.params.id;
        const result = await Category.findByIdAndRemove(id);
        const message = "Delete Item Successfully"
        res.status(200).json({message : message});
    } catch (e) {
        console.log("e..",e);
    }
})


module.exports = router;

//routes
// http://localhost:8000/api/Category/create-category
// http://localhost:8000/api/Category/getAllCategory
// http://localhost:8000/api/Category/findOne-category/64ddb4c8485f459424f49db2
// http://localhost:8000/api/Category/Edit-category/64ddb4c8485f459424f49db2
// http://localhost:8000/api/Category/delete-category/64ddb4c8485f459424f49db2

