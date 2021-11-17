// Import the user model
const User = require('../models/user');
// Import bcrypt and jwt packages
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Import validation.js
const {
    signupValidation,
    loginValidation
} = require('../routes/validation');

//signup function
exports.signup = async (req, res, next) => {
    //signup validation 
    const {
        error
    } = signupValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // email already in db
    const emailExist = await User.findOne({
        email: req.body.email
    });
    if (emailExist) return res.status(400).send('Email already used');
    //hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser)
    } catch (err) {
        res.status(400).send(err)
    }
};
exports.login = (req, res, next) => {

}