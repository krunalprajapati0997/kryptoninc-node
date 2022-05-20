const express= require('express');
const mongoose= require('mongoose');
const bodyParser = require('body-parser');


const port=6000;

mongoose.connect('mongodb://localhost:27017/Happy', {useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('Connection Succesfully'))
.catch(err => console.log(err));

const app = express('');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors())


const studentrouter= require("./routes/students");
app.use('/',studentrouter)



app.listen(port, () =>{
    console.log('Server started');
})

