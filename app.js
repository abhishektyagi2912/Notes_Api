const express = require("express");
const app = express();

var authRouter = require('./routes/auth');
var notesRouter = require('./routes/notesroutes');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");
dotenv.config();

app.set('view engine', 'ejs');

app.use(cors());

app.use(express.static('public'));
app.use(express.json()); //this is used because we are sending data in json format and req is in string format so we have to convert it into json format
app.use(authRouter);
app.use("/notes",notesRouter);

// i want to validate the user before accessing the notes page
// for that we have to create a middleware
// app.use(middleware);
// app.use((req,res,next)=>{
//     // console.log(req.method , req.url);
//     next();
// });


app.get('/', (req, res) => {
    res.render('home');
});


//defining the port
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URL;
mongoose.connect(uri).then(()=>{
    app.listen(PORT,()=>{
        console.log(`Listening the port http://localhost:${PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});
