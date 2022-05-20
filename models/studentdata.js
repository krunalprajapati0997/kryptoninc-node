const mongoose =require('mongoose');

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        // required: true,
    },
    roll: {
        type: String,
        // required: true,
        // unique: true,    
    },
    registration: {
        type: String,
        // required: true,
        // unique: true,
    },
    subjects: {
        type: String,
        // required: true,
    },
    profile_file:{
        type:String
    }

})

var User =  mongoose.model('User',studentSchema);
module.exports= User;