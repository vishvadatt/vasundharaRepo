const router = require("express").Router();
const Vehicle = require("../Model/vehicle.model");
const protectRoute = require("../Auth/auth");
const { ObjectId } = require("mongodb");

router.post("/create-vehicle" ,protectRoute, async(req,res) => {
    try {
        const bodyData = req.body;
        bodyData.userId = req.user._id.toString()
        const brand = new Vehicle(bodyData);
        let result = await brand.save();
        res.status(200).json({status : 200,result : result});
    } catch (e) {
        console.log("e..",e);
    }
})

router.get("/getAllVehicle" ,protectRoute, async(req,res) => {
    try {
        let Query = {}
        // const id = req.user._id.toString()
        // console.log(id);
        const search = req.query.search;
        const filter = req.query.filter;
        if(search){
            Query["vehicleName"] = {"$regex" : search,'$options' : "i"}   
        }

        if(filter){
            Query["brandId"] = filter.toString()   
        }

        const result = await Vehicle.aggregate(
            [
                    {
                        $match: Query
                    },
                    {
                        $lookup: 
                        {
                            from: 'brands',
                            localField: 'brandId',
                            foreignField: '_id',
                            as: 'BrandInfo'
                        }
                    },
                    {
                        $lookup: 
                        {
                            from: 'categories',
                            localField: 'categoryId',
                            foreignField: '_id',
                            as: 'CategoryInfo'
                        }
                    },
                    {
                        $unwind: {
                            path: "$CategoryInfo",
                            preserveNullAndEmptyArrays: false
                        }
                    }, 
                    {
                        $unwind: {
                            path: "$BrandInfo",
                            preserveNullAndEmptyArrays: false
                        }
                    },
                    {
                            $project: {
                                vehicleName : 1,
                                vehicleNumber : 1,
                                color : 1,
                                Description : 1,
                                Brnad : "$BrandInfo.brandName",
                                Category : "$CategoryInfo.categoryName"
                            }
                        }
                    ])
          console.log("result..",result);
        res.status(200).json(result);
    } catch (e) {
        console.log("e..",e);
    }
})

router.get("/findOne-vehicle/:id" , async(req,res) => {
    try {
        const id = req.params.id;
        const result = await Vehicle.findById(id);
        res.status(200).json(result);
    } catch (e) {
        console.log("e..",e);
    }
})

router.put("/Edit-vehicle/:id" , async(req,res) => {
    try {
        const id = req.params.id;
        const result = await Vehicle.findByIdAndUpdate(id,req.body,{new : true});
        res.status(200).json(result);
    } catch (e) {
        console.log("e..",e);
    }
})

router.delete("/delete-vehicle/:id" , async(req,res) => {
    try {
        const id = req.params.id;
        const result = await Vehicle.findByIdAndRemove(id);
        const message = "Delete Item Successfully"
        res.status(200).json({message : message});
    } catch (e) {
        console.log("e..",e);
    }
})


module.exports = router;

// routes
// http://localhost:8000/api/Vehicle/create-vehicle
// http://localhost:8000/api/Vehicle/getAllVehicle
// http://localhost:8000/api/Vehicle/findOne-vehicle/64ddb7ead3152f28ccae5abd
// http://localhost:8000/api/Vehicle/Edit-vehicle/64ddb7ead3152f28ccae5abd
// http://localhost:8000/api/Vehicle/delete-vehicle/64ddb4c8485f459424f49db2