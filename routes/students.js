const express = require("express");
var jwt = require('jsonwebtoken');

const  student_Act = require("../controllers/students"); 
const  examstudent = require('../controllers/examstudent')
const  iamgecontroll = require('../controllers/imagecontroll')

const router = express.Router();

router.post('/exam/register',examstudent.registeruser);
router.post('/exam/login',examstudent.loginstudent);
router.get('/exam',examstudent.getExam);
router.put('/exam/:id',examstudent.updateExam)
router.delete('/exam/:id',examstudent.deleteEaxm);

router.get('/', student_Act.getStudents);
router.get('/:id', student_Act.getspecStudent);
router.post('/app', student_Act.createstudent);
router.put('/:id', student_Act.updatestudent);
router.delete('/:id', student_Act.deletestudent);

router.post('/upload',iamgecontroll.uploadimage)


module.exports=router;