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
                        user_transaction: [],
                        user_account: 5000,
                    });
                    user.save((err,registerUser)=>{
                        if(err){
                            res.status(400).json({error: err});
                            // send user an error notification
                        }else{
                            res.status(200).send({message: "success"});
                        }
                    });
                })
            })
        }
    })
    .catch(err => res.json ({error: err}));
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
                let userInfo = {
                    email: user.user_email,
                    account: user.user_account,
                    transaction: user.user_transaction
                }
                res.status(200).json(userInfo);
            }else{
                res.status(401).json({success: false, message: "Wrong email/password"});
            }
        })
    })
    .catch(err => {
        res.status(401).json({success: false, message: "Wrong email/password"});
    });
})

// Update 
router.post('/updateAccount', (req,res)=>{
    User.findOne({
        user_email: req.body.email,
    })
    .then((users) => {
        if(users){
            users.user_account = req.body.account;
        }else{
            //How is this possiblee
            res.status(401).json({success: false, message: "Wrong email/password"});
        }
        users.save((err,savedUser)=>{
            if(err){
                console.log(err);
            }else{
                res.status(200);
            }
        });
    });
})

// Update Transaction
router.post('/updateTransaction', (req,res)=>{
    User.findOne({
        user_email: req.body.email,
    })
    .then((users) => {
        let transaction = req.body.transaction;
        transaction.setOnInsert.createAt = new Date();
        if(users){
            users.user_transaction.push(req.body.transaction);
        }else{
            res.status(401).json({success: false, message: "Wrong email/password"});
        }
        users.save((err,savedUser)=>{
            if(err){
                res.status(401).json({Error: err});
            }else{
                let userInfo ={
                    transaction: users.user_transaction
                }
                res.status(200).json(userInfo);
            }
        })
    })
    ;
})




module.exports = router;


