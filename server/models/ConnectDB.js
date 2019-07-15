const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const db = `mongodb://${process.env.DBUSER}:${process.env.DBPASSWORD}@ds121268.mlab.com:21268/stockportfoliodb`


module.exports={
    connect : ()=>{
        mongoose.connect(db,{
            useNewUrlParser: true
        },(err)=>{
            if(err) console.log(err);
            else{
                console.log("Connection Established")
            }
        })
    }
}