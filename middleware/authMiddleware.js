require('dotenv').config()

const jwt = require("jsonwebtoken")

const authorization = (req , res ,next) =>{
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token , process.env.ACCESS_TOKEN_SECRET , (err , decodedToken)=>{
            if(err){
                console.log(err);
                res.redirect('/login')
            }
            else{
                next();
            }
        })
    }
    else{
        res.redirect("/login")
    }
}

module.exports = {authorization};