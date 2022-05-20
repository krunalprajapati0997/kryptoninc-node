const express = require('express');
const mongoose = require('mongoose');

const User = require('../models/studentdata.js');

const router = express.Router();


const getStudents = async (req, res) => {
    try {
        const student = await User.find();

        res.status(200).json(student);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


const getspecStudent = async (req, res) => {
    try {
        const stud = await User.findOne({ _id: req.params.id });

        res.status(200).json(stud);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createstudent = async (req, res) => {
    // console.log(req.body);
    const newstudent = new User({
        name: req.body.name,
        roll: req.body.roll,
        registration: req.body.registration,
        subjects: req.body.subjects,


    })
    try {
        await newstudent.save();

        res.status(200).json(newstudent);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}


const updatestudent = (req, res) => {
    User.findOne({ _id: req.params.id }, function (err, user) {
        if (err) throw err
        if (!user) {
            res.json({ success: false, message: 'No User found' })
        } else {
            user.name = req.body.name,
                user.roll = req.body.roll,
                user.registration = req.body.registration,
                user.subjects = req.body.subjects,
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


const deletestudent = async (req, res) => {
    try {
        await User.findOneAndRemove({ _id: req.params.id });
        res.status(200)
        res.json({ success: true, message: 'Your Account has been delete now !!!' });
    } catch (error) {
        res.status(402).json({ message: error.message });
    }

}


module.exports = {
    getStudents, createstudent, getspecStudent, updatestudent, deletestudent,
};
