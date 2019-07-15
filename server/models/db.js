 const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    user_name:{
        type: String
    },
    user_email:{
        type: String,
        unique: true
    },
    user_password:{
        type: String
    },

    user_account:{
        type: String
    },
});

module.exports = mongoose.model('User', User);