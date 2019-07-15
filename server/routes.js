const express = require('express');
const User = require('./models/db');
const connectDB = require('./models/ConnectDB');
const router = express.Router();

connectDB.connect();

router.post('/register', (req,res)=>{
    let userData = req.body; 
    let user = new User(userData);
    user.save((err,registerUser)=>{
        res.status(200).send(registeredUser);
    });
})
