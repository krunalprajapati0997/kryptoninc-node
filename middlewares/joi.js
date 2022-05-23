const Joi = require('joi');
const validateSchema = require('../middlewares/validation')

const userregister = async (req,res,next)=>{
    const Schema = Joi.object().keys({
        username: Joi.string().min(3).max(40).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().min(10).required(),
        password: Joi.string().required(),    
    })
    validateSchema(req,res,next,Schema);
}

module.exports = {userregister}



