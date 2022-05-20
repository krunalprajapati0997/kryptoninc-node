const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10

const Exam = require("../models/exam.js");

const router = express.Router();
var secret = 'harrypotter';


const registeruser = async (req, res) => {
    var user = new Exam();
    //const hashedPassword = await bcrypt.hash(req.body.password, 12);
    var hashedPassword = await bcrypt.hash(req.body.password, SALT_WORK_FACTOR)
    const token = jwt.sign({ email: user.email }, secret, { expiresIn: '1h' });

    user.username = req.body.username
    user.phone = req.body.phone
    user.email = req.body.email
    user.password = hashedPassword


    if (req.body.username == null || req.body.phone == null || req.body.email == null || req.body.password == null) {
        res.json({ success: false, message: 'Ensure Username,  password and email were provided' });
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




module.exports = {loginstudent, registeruser,
    getExam, deleteEaxm, updateExam
};
