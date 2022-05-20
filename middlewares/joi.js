const Joi = require('joi');
const validateSchema = require('../middlewares/validation')

const userregister =(req,res)=>{
    const Schema = Jio.object().keys({
        username: Joi.string().min(3).max(40).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().min(10).required(),
        profile_file: Joi.string(),    
    })
    validateSchema(req,res,Schema);
}

module.exports = {userregister}