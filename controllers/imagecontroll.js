var Image = require('../models/image');
const express = require("express");
const multer = require('multer');
const upload = require("../middlewares/upload-middleware");
const fs = require('fs');
const uploadsDir = __dirname + './uploads';

const uploadimage = (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                res.json({ success: false, message: 'Profile Image too large !!!' });
            } else if (err.code === 'filetype') {
                res.json({ success: false, message: 'Invaild : Only jpeg, jpg and png supported !!!' });
            } else {
                console.log(err);
                res.json({ success: false, message: 'Profile Image not upload !!!' });
            }
        } else {
            if (!req.file) {
                res.json({ success: false, message: 'No file selected !!!' });
            } else {
                let user = Image();

                user.name = req.body.name;
                user.username = req.body.username;
                user.email = req.body.email;
                user.phone = req.body.phone;
                user.profile_file = req.file.filename;
                user.profile_url = "http://localhost:6000/uploads/" + req.file.filename;
                user.save(function (err) {
                    if (err) {
                        console.log(err.errors.name);
                        if (err.errors.name) {
                            res.json({ success: false, message: "Name is required" });
                        } else if (err.errors.email) {
                            res.json({ success: false, message: "E-mail is required" });
                        } else if (err.errors.mobile) {
                            res.json({ success: false, message: "Mobile is required" });
                        } else if (err.errors.password) {
                            res.json({ success: false, message: "Password is required" });
                        } else {
                            res.json({ success: false, message: err });
                        }
                    } else {
                        res.json({ success: true, message: 'Registration Successfully' });
                    }
                });
            }
        }
    })
}

const getoneimage = async (req, res) => {
    try {
        console.log('hey____________')

        let user = await Image.find({ _id: req.params.id });
        res.status(200)
        res.json(user);
    } catch (err) {
        res.status(404).json({ message: message })
    }
}

const getimage = async (req, res) => {
    try {
        console.log('hey')
        const happy = await Image.find({});
        res.status(200);
        res.json(happy)
    } catch (error) {
        res.status(404).json({ message: message })
    }
}
const deleteimage = async (req, res) => {
     if(req.params.id == null || req.params.id == undefined) {
        res.json({mesage: "id not defined", success: false})
    } else {
        Image.find({ _id: req.params.id }).exec(async (err, ress) => {
            // res.json({'data':ress})
            
            fs.unlink("uploads/"+ress[0].profile_file, async (err) => {
                if (err) throw err;
                const user = await Image.findByIdAndDelete(req.params.id);
                res.send(user)
                res.json({success:true,message:'Accout Delete Succesfully'})
            })
        })      
    }
}

const updateimage = async(req,res) =>{
    try {
        const id = await Image.findById(req.params.id);
        if (!id) throw new Error("id is not find");
        const notes = await Image.findByIdAndUpdate({ _id: req.params.id },req.body);
        
        const data = await notes.save();
        res.status(200).json({success: true, message: "data update in notes",data,});
      } catch (error) {
        errorLogger.error(error.message);
        res.status(400).json({ success: false, message: error.message });
      }
}

module.exports = { uploadimage, getimage, getoneimage,deleteimage,updateimage }