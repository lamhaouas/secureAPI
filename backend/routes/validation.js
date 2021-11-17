const joi = require('joi');

// signup Validation
const signupValidation = (data) => {
  const schema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().min(6).required()
  });
  return schema.validate(data);
};
// login Validation
const loginValidation = (data) => {
  const schema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().min(6).required()
  });
  return schema.validate(data);
};


// export the functions
module.exports.signupValidation = signupValidation;
module.exports.loginValidation = loginValidation;