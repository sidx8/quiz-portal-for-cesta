const Joi= require('joi');
const mongoose =require('mongoose');

const Register= mongoose.model('registers', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    member1: {
        type: String,
        required: true
    },
    member2: {
        type: String,
        required: true
    }
})
);

function validateRegister(register){    
    const schema= {
        name: Joi.string().min(1).max(50).required(),
        member1: Joi.string().min(1).max(50).required(),
        member2: Joi.string().min(1).max(50).required()
    };
    return Joi.validate(register, schema);
}

module.exports.Register= Register;
module.exports.validate=validateRegister;