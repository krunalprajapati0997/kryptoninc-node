const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    name:{type:String},
    username:{type:String},
    email:{type:String},

    phone:{type:Number},
    profile_file: { type : String },
    
    // profile_file: { type: Array },
    profile_url: { type: String } 
})

const Image = mongoose.model('Image',userSchema)

module.exports = Image