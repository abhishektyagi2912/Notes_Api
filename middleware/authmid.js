require('dotenv').config();
const jwt = require('jsonwebtoken');
SECRET_KEY = process.env.SECRET_KEY;

const auth = (req,res,next)=>{

    try {
        let token = req.cookies.authToken;
        if(token){
            // token = token.split(" ")[1];    /// bearer token bhi aata h to usko split krke uske baad wala token lenge kyuki y token me bearer likha hua aata h
            let decoded = jwt.verify(token,SECRET_KEY);
            req.userId = decoded.id; // Store user data in the request object

        }else{
            return res.render('login',{message : "Please login first"});
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Something went wrong"});
    }
}

module.exports = auth;