const jwt = require("jsonwebtoken");
const Register = require("../Model/Auth.model");

const protectRoute = async (req,res,next) => {
    let token;
    try {
        if(req.headers.authorization){
            token = req.headers.authorization
        }
        if(!token){
            return res.status(404).json({message : "This Routes Are Protected please provide token"})
        }

        const decodeToken = jwt.verify(token,"secret");
        const user = await Register.findById(decodeToken._id);
        console.log(user);
        if(user){
            req.user = user
            next();
        }
    } catch (e) {
        console.log("e.",e);
    }
}

module.exports = protectRoute;