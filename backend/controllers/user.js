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
exports.signup = async (req, res) => {
    //signup validation 
    const {
        error
    } = signupValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    // save user to db
    const user = new User({
        email: req.body.email,
        password: hashPassword
    });
    try {
        const savedUser = await user.save();
        res.send(
            savedUser
        )
    } catch (err) {
        res.status(400).send(err)
    }
};
//login function
exports.login = async (req, res) => {
    //login validation 
    const {
        error
    } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // check if the user exist
    const user = await User.findOne({
        email: req.body.email
    });
    if (!user) return res.status(400).send('User not found!');
    //check the password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Wrong password');
    //create and assign a token
    const token = jwt.sign({
        _id: user._id
    }, process.env.TOKEN_SECRET);
    // return userId string and token string
    res.send({
        userId: user._id,
        token: token,
    })
}