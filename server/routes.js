const express = require('express');
const User = require('./models/db');
const bcrypt = require('bcryptjs');
const connectDB = require('./models/ConnectDB');
const router = express.Router();
const axios = require('axios');

connectDB.connect();

router.post('/Register', (req,res)=>{
    User.findOne({
        user_email: req.body.email
    })
    .then((users)=>{
        if(users){
            // then there's a user with this email aready
            return res.status(400).json({
                email: "Email already Exist"
            });
        }else{
            // email does not exist

            bcrypt.genSalt(10, (err,salt)=>{
                bcrypt.hash(req.body.password,salt, (err, hash)=>{
                    if(err) throw err;
                    let user = new User({
                        user_name: req.body.name,
                        user_email: req.body.email,
                        user_password: hash,
                        user_account: 5000,
                    });
                    user.save((err,registerUser)=>{
                        if(err){
                            res.json({error: err});
                            // send user an error notification
                        }else{
                            res.status(200).send(registerUser);
                        }
                    });
                })
            })
        }
    })
    .catch(err => res.json ({error: err}));
})

router.post('/Account', (req,res)=>{
    let userData = req.body; 
    let user = new User(userData);
    user.save((err,registerUser)=>{
        if(err){
            res.status(200).json({error: err})
            // send user an error notification
        }else{
            res.status(200).send(registerUser);
        }
    });
})

router.get('/AllUsers', (req,res)=>{
    User.find()
    .then(users => res.json(users));
})

router.post('/SignIn', (req,res)=>{
    let email = req.body.email
    let password = req.body.password.trim();
    User.findOne({
        user_email: email
    })
    .then((user) => {
        if(!user){
            return res.status(401).json({success: false, message: "Wrong email/password", error: err});
        }

        bcrypt.compare(password,user.user_password)
        .then(isMatch => {
            if(isMatch){
                console.log(isMatch);
                res.status(200).json(user)
            }else{
                res.status(401).json({success: false, message: "Wrong email/password"});
            }
        })
    })
    .catch(err => {
        res.status(401).json({success: false, message: "Wrong email/password"});
    });
})

// Get Account Balance
router.get('/Account', (req,res)=>{
    User.findOne({
        user_email: req.body.email,
        user_password: req.body.password
    })
    .then((users) => {
        if(users){
            res.status(200).json(users.account);
        }else{
            res.status(401).json({success: false, message: "Wrong email/password"});
        }
    });
})
// Update 
router.post('/Account', (req,res)=>{
    User.findOne({
        user_email: req.body.email,
        user_password: req.body.password
    })
    .then((users) => {
        if(users){
            users.account = req.body.account;
        }else{
            //How is this possiblee
            res.status(401).json({success: false, message: "Wrong email/password"});
        }
        users.save();
    });
    User.save();
})

// Get Transactions
router.get('/Transaction', (req,res)=>{
    let userData = req.body; 
    let user = new User(userData);
    user.save((err,registerUser)=>{
        if(err){
            res.status(500).json({message: 'Transaction Failed'});
        }else{
            res.status(200).send(registerUser);
        }
    });
})

// Update Transaction
router.post('/Transaction', (req,res)=>{
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


