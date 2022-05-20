const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const examSchema = mongoose.Schema({
    username:{
        type:String
    },
    phone:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
})



const Exam = mongoose.model("Exam",examSchema);
module.exports = Exam;