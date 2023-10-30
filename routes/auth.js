const express = require("express");
const authrouter = express.Router();
const middleware = require('../middleware/middleware');
const { signup, login } = require("../controllers/userContollers");

// here we made controllers because we make this file in structure way so here we only call the function from controllers
authrouter.post('/signup', signup);

authrouter.post('/login', login);
authrouter.get('/login', (req, res) => {
    res.render('login');
});

module.exports = authrouter;

