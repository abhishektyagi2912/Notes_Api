const userModel = require("../model/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables from .env file
const SECRET_KEY = process.env.SECRET_KEY;


const signup = async (req, res) => {
     
    //exsiting user check
    // create hashed pass
    // user creation
    // token generated

    const {username,email,password} = req.body;  // y sb body ki property hongi 
    try{
        const exsitingUser = await userModel.findOne({email : email});
        if(exsitingUser){
            return res.status(400).json({message : "User already exsits"}); //400 means bad request
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await userModel.create({username,email,password : hashedPassword});

        const token = jwt.sign({email: user.email, id : user._id, }, SECRET_KEY);

        // all process are done user create and token are generated
        res.cookie("authToken", token, {
            httpOnly: true,
            sameSite : "lax"
            // Other cookie options (e.g., secure, sameSite, maxAge, etc.)
        });
        res.cookie("userId", user._id, {
            httpOnly: false,
            sameSite : "lax"
            // Other cookie options (e.g., secure, sameSite, maxAge, etc.)
        });
        return res.status(201).json({result : user, token});   //201 means created sucessfully
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message : "Something went wrong"}); //500 means server error
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email: email });
        if (!existingUser) {
            return res.status(404).json({ message: "User doesn't exist" }); // 404 means not found
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" }); // 400 means bad request
        }
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY);
        
        // res.setHeader('Authorization', `Bearer ${token}`); // Set the Authorization header

        res.cookie("authToken", token, {
            httpOnly: true,
            sameSite : "lax"
            // Other cookie options (e.g., secure, sameSite, maxAge, etc.)
        });
        res.cookie("userId", existingUser._id, {
            httpOnly: false,
            path : "/"
            // Other cookie options (e.g., secure, sameSite, maxAge, etc.)
        });

        res.status(200).json({ user: existingUser, token: token ,message : "Login Sucessfully"});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" }); // 500 means server error
    }
}


module.exports = {signup,login}