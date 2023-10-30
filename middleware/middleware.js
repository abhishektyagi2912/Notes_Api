// const express = require("express");
// const router = express.Router();
const jwt = require("jsonwebtoken");

SECRET_KEY = process.env.SECRET_KEY;

const auth = (req,res,next)=>{

    try {
        let token = req.headers.authorization;
        if(token){
            token = token.split(" ")[1];    /// bearer token bhi aata h to usko split krke uske baad wala token lenge kyuki y token me bearer likha hua aata h
            let user = jwt.verify(token,SECRET_KEY);
            req.userId = user.id;    // y decoded me id h usko req me store krwa diya
        }else{
            return res.status(401).json({message : "User not authorized"});
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Something went wrong"});
    }
}

module.exports = auth;