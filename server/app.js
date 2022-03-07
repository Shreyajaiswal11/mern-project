const dotenv = require("dotenv");
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const express = require('express');
const app = express();
var cors = require('cors')
app.use(cors())
app.use(cookieParser())

dotenv.config({ path: './config.env' });

require('./db/conn');
//const User = require('./model/userSchema');

app.use(express.json());

// link the router files to make our route easy 
app.use(require('./router/auth'));

const PORT = process.env.PORT||5000;

app.get('/contact', (req, res) => {
    res.cookie('Test',"shreya");
    res.send(`Hello Contact world from the server`);
});


app.listen(PORT, () => {
    console.log(`server is runnig at port no ${PORT}`);
})