const express = require('express');
const User = require('./models/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const connectDB = require('./models/ConnectDB');
const dotenv = require('dotenv').config();
const router = express.Router();
const jsonp = require('jsonp');
const axios = require('axios');


connectDB.connect();

// For Mobile Devices
router.get('/MobileDataRequest', (req,res)=>{

    let value = axios.get('https://ws-api.iextrading.com/1.0/tops/last')
        .then((data)=>{
            console.log(data.data);
            return res.json({info:data.data});
        })
        .catch((err)=>{
            console.log(err)
            return err;
        })
        console.log(value);
        return value;
})


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
                            // Idenifies the user
                            let token = jwt.sign({subject: registerUser._id, iat: Math.floor(Date.now() / 1000) + 60}, 'secret',)
                            res.status(200).send(token);
                        }
                    });
                })
            })
        }
    })
    .catch(err => res.json ({error: err}));
})

router.post('/verifyToken', (req,res)=>{
    console.log("entered vertifying token");
    let token = req.body.token;
    jwt.verify(token,'secret',(err,value)=>{
        if(err) {
            console.log('not working');
            return res.status(401).json({success: false, message: "Wrong email/password"});
        }
        else{
            User.findOne({
                _id: value.subject
            })
            .then((user)=>{
                if(!user){
                    throw new Error({Success: failed,message:"no user with this id"});
                } 
                else{
                    let foundUser = {
                        email:user.user_email,
                        account: user.user_account, 
                        transaction: user.user_transaction
                    }
                    return res.status(200).json({foundUser})
                }
            })
            .catch((err) =>{
                res.status(401).json({success: false, message: "Wrong email/password"});
            })
        }
    })


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
                 // Idenifies the user
                 userInfo.token = jwt.sign({subject: user._id, exp: Math.floor(Date.now() / 1000) + 30}, 'secret',)
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

// Sends Text
router.post('/sendText', (req,res)=>{
    let phone = req.body.phone;
    const accountSid = process.env.TWILIO_SID;
    const auth = process.env.TWILIO_AUTH;
    const client = require('twilio')(accountSid,auth);

    client.messages
    .create({
        body: 'HELLO THERE',
        from: '+12512748514',
        to: phone
    })

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


