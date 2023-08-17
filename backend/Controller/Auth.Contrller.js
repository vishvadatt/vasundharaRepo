const router = require("express").Router();
const Register = require("../Model/Auth.model");
const jwt = require("jsonwebtoken");

router.post("/login" , async(req,res) => {
    try {
        console.log(req.body.email);
        const findOne = await Register.findOne({email : req.body.email});
        
        if(findOne !== null){
            if(req.body.password !== findOne?.password){
                return res.status(200).json({message : "Password not match"}); 
            }
            const payload = {
                _id : findOne._id,
                name : findOne.username,
                email : findOne.email
            }
            const token = jwt.sign(payload,"secret")
            const response = {
                status : 200,
                token : token,
                user : findOne,
            }
            res.status(200).json({data : response})
        }else{
            return res.status(200).json({message : "User Not Found With this email Address"});
        }
    } catch (e) {
        console.log("e..",e);
    }
})


module.exports = router;
