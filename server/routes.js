const express = require('express');
const User = require('./models/db');
const connectDB = require('./models/ConnectDB');
const router = express.Router();

connectDB.connect();

router.post('/Register', (req,res)=>{

    console.log(req.body);

    let user = new User({
        user_name: req.body.name,
        user_email: req.body.email,
        user_password: req.body.password,
        user_account: 5000,
    });
    user.save((err,registerUser)=>{
        if(err){
            console.log(err);
        }else{
            res.status(200).send(registerUser);
        }
    });
})

router.post('/Account', (req,res)=>{
    let userData = req.body; 
    let user = new User(userData);
    user.save((err,registerUser)=>{
        if(err){
            console.log(err);
        }else{
            res.status(200).send(registerUser);
        }
    });
})
// Check User
router.get('/SignIn', (req,res)=>{
    User.find()
    .then(users => res.json(users));

})

// Get Account Balance
router.get('/BankAccount', (req,res)=>{
    let userData = req.body; 
    let user = new User(userData);
    user.save((err,registerUser)=>{
        if(err){
            console.log(err);
        }else{
            res.status(200).send(registerUser);
        }
    });
})

// Get Transactions
router.get('/Transaction', (req,res)=>{
    let userData = req.body; 
    let user = new User(userData);
    user.save((err,registerUser)=>{
        if(err){
            console.log(err);
        }else{
            res.status(200).send(registerUser);
        }
    });
})




module.exports = router;


