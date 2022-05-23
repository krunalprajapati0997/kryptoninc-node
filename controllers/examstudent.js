const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10

//Nodemail item 
const nodemailer = require("nodemailer");
require('dotenv').config();
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;


const Exam = require("../models/exam.js");

const router = express.Router();
var secret = 'harrypotter';



const registeruser = async (req, res) => {
    var user = new Exam();
    //const hashedPassword = await bcrypt.hash(req.body.password, 12);
    var hashedPassword = await bcrypt.hash(req.body.password, SALT_WORK_FACTOR)
    const token = jwt.sign({ email: user.email }, secret, { expiresIn: '1h' });
    let testAccount = await nodemailer.createTestAccount();

    // let transporter = nodemailer.createTransport({
    //     service: "gmail",
    //     auth: {
    //       user: "z",
    //       pass: "krunal0997",
    //     },
    //   });
    //   // console.log("transporter", transporter);
    //   let mailOptions = {
    //     from: "krnalprajapati22121999@gmail.com",
    //     to: "krunal.prajapati@kryptoninc.co",
    //     subject: "password verification",
    //     text: "use this password for signup",
    //   };
    //   transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //       console.log("error send me", error);
    //     }
    //     console.log("info me", info);
    //     res.render("contact", { message: "Email has been sent" });
    //   });

    const createTransporter = async () => {
        const oauth2Client = new OAuth2(
          process.env.CLIENT_ID,
          process.env.CLIENT_SECRET,
          "https://developers.google.com/oauthplayground"
        );
      
        oauth2Client.setCredentials({
          refresh_token: process.env.REFRESH_TOKEN
        });
      
        const accessToken = await new Promise((resolve, reject) => {
          oauth2Client.getAccessToken((err, token) => {
            if (err) {
              reject("Failed to create access token :(");
            }
            resolve(token);
          });
        });
      
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: process.env.EMAIL,
            accessToken ,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN
          }
        });
      
        return transporter;
      };
      
      const sendEmail = async (emailOptions) => {
        let emailTransporter = await createTransporter();
        await emailTransporter.sendMail(emailOptions);
      };
      
      sendEmail({
        subject: "Test",
        text: "I am sending an email from nodemailer!",
        to: "put_email_of_the_recipient",
        from: process.env.EMAIL
      });
  
    
    user.username = req.body.username
    user.phone = req.body.phone
    user.email = req.body.email
    user.password = hashedPassword


    

    if (req.body.username == null || req.body.phone == null || req.body.email == null || req.body.password == null) {
        res.json({ success: false, message: 'Ensure Username,phone,  password and email were provided' });
    } else {
        user.save(function (err) {
            if (err) {
                if (err.errors != null) {
                    if (err.errors.username) {
                        res.json({ success: false, message: 'Required minimum digits 3 of User Name' });
                    } else if (err.errors.email) {
                        res.json({ success: false, message: err.errors.email.message });
                    } else if (err.errors.password) {
                        res.json({ success: false, message: err.errors.password.message });
                    }
                } else {
                    res.json({ success: false, message: err });
                }
            } else {
                res.json({ success: true, message: 'Successfully Registered !', token });
            }
        })
    }
}


const loginstudent = (req, res) => {
    Exam.findOne({ email: req.body.email }).select('email password').exec(function (err, user) {
        if (err) throw err;
        else {
            if (!user) {
                res.json({ success: false, message: 'email and password not provided !!!' });
            } else if (user) {
                if (!req.body.password) {
                    res.json({ success: false, message: 'No password provided' });
                } else {
                    if (bcrypt.compareSync(req.body.password, user.password)) {

                        var token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: '24h' });
                        res.json({ success: true, message: 'User authenticated!', token: token });
                    }
                    else {
                        res.json({ success: false, message: 'Could not authenticate password' });
                    }

                }
            }
        }
    });
}

const getExam = async (req, res) => {
    try {
        const exams = await Exam.find();
        res.status(200).json(exams);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteEaxm = async (req, res) => {
    try {
        const exams = await Exam.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json(exams);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const forgatepassword = async (req, res) => {
    var hashedPassword = await bcrypt.hash(req.body.password, SALT_WORK_FACTOR)
    Exam.findOne({ email: req.body.email }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.json({ success: false, message: 'No user found' });
        } else {
            user.password = hashedPassword;
            user.save(function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({ success: true, message: 'Details has been updated!' });
                }
            });
        }
    });
}

const updateExam = async (req, res) => {
    Exam.findOne({ _id: req.params.id }, function (err, user) {
        if (err) throw err
        if (!user) {
            res.json({ success: false, message: 'No User found' })
        } else {
            user.username = req.body.username,
                user.phone = req.body.phone,
                user.email = req.body.email,
                user.save(function (err) {
                    if (err) {
                        console.log(err)
                    } else {
                        res.json({ success: true, message: "Details Has been update" })
                    }
                })
        }
    })
}






module.exports = {
    loginstudent, registeruser, forgatepassword,
    getExam, deleteEaxm, updateExam,
};
