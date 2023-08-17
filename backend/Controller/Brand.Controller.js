const router = require("express").Router();
const Brand = require("../Model/Brand.model");

router.post("/create-Brand" , async(req,res) => {
    try {
        const bodyData = req.body;
        const brand = new Brand(bodyData);
        const result = await brand.save();
        res.status(200).json(result);
    } catch (e) {
        console.log("e..",e);
    }
})

router.get("/getAllBrands" , async(req,res) => {
    try {
        const result = await Brand.find();
        res.status(200).json(result);
    } catch (e) {
        console.log("e..",e);
    }
})

router.get("/findOne-Brand/:id" , async(req,res) => {
    try {
        const id = req.params.id;
        const result = await Brand.findById(id);
        res.status(200).json(result);
    } catch (e) {
        console.log("e..",e);
    }
})

router.put("/Edit-Brand/:id" , async(req,res) => {
    try {
        const id = req.params.id;
        const result = await Brand.findByIdAndUpdate(id,req.body,{new : true});
        res.status(200).json(result);
    } catch (e) {
        console.log("e..",e);
    }
})

router.delete("/delete-Brand/:id" , async(req,res) => {
    try {
        const id = req.params.id;
        const result = await Brand.findByIdAndRemove(id);
        const message = "Delete Item Successfully"
        res.status(200).json({message : message});
    } catch (e) {
        console.log("e..",e);
    }
})


module.exports = router;
// routes
// http://localhost:8000/api/Brand/create-Brand
// http://localhost:8000/api/Brand/getAllBrands
// http://localhost:8000/api/Brand/findOne-Brand/64ddb276ae5502cdaaea0208
// http://localhost:8000/api/Brand/Edit-Brand/64ddb276ae5502cdaaea0208
// http://localhost:8000/api/Brand/delete-Brand/64ddb276ae5502cdaaea0208