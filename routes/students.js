const express = require("express");
var jwt = require('jsonwebtoken');

const  student_Act = require("../controllers/students"); 
const  examstudent = require('../controllers/examstudent')
const  iamgecontroll = require('../controllers/imagecontroll')
const  upload = require('../middlewares/upload-middleware')

const router = express.Router();

router.post('/exam/register',examstudent.registeruser);
router.post('/exam/login',examstudent.loginstudent);
router.get('/exam',examstudent.getExam);
router.put('/exam/:id',examstudent.updateExam)
router.delete('/exam/:id',examstudent.deleteEaxm);

router.get('/student', student_Act.getStudents);
router.get('/student/:id', student_Act.getspecStudent);
router.post('/app', student_Act.createstudent);
router.put('/:id', student_Act.updatestudent);
router.delete('/:id', student_Act.deletestudent);


router.get("/image",iamgecontroll.getimage);
router.post('/image',iamgecontroll.uploadimage)
router.get('/image/:id',iamgecontroll.getoneimage)
router.delete('/image/:id',iamgecontroll.deleteimage)
router.put('/image/:id',upload ,iamgecontroll.updateimage)


module.exports=router;