const express = require("express");
var jwt = require('jsonwebtoken');

const student_Act = require("../controllers/students");
const examstudent = require('../controllers/examstudent')
const iamgecontroll = require('../controllers/imagecontroll')
const { userregister } = require('../middlewares/joi')
const upload = require('../middlewares/upload-middleware')



// ???/?asdasfsdsafdfasdfs

const router = express.Router();

//loging and Registrtion with crud
router.post('/exam/register', userregister, examstudent.registeruser);
router.post('/exam/login', userregister, examstudent.loginstudent);
router.get('/exam', userregister, examstudent.getExam);
router.put('/exam/:id', userregister, examstudent.updateExam)
router.delete('/exam/:id', userregister, examstudent.deleteEaxm);
router.patch('/exam/forgot', userregister, examstudent.forgatepassword)

//simpal crud  optration
router.get('/student', student_Act.getStudents);
router.get('/student/:id', student_Act.getspecStudent);
router.post('/app', student_Act.createstudent);
router.put('/:id', student_Act.updatestudent);
router.delete('/:id', student_Act.deletestudent);


//image with Crud optration
router.get("/image", iamgecontroll.getimage);
router.post('/image', iamgecontroll.uploadimage)
router.get('/image/:id', iamgecontroll.getoneimage)
router.delete('/image/:id', iamgecontroll.deleteimage)
router.put('/image/:id', upload, iamgecontroll.updateimage)


module.exports = router;