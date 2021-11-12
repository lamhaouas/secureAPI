// Import the user model
const User = require('../models/user');
// Impoert bcrypt and jwt packages
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//signup function
const signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
            res.json({
                error: err
            })
        }
        let user = new User({
            email: req.body.email,
            password: hashedPass
        })
        user.save().then(user => {
                res.json({
                    message: 'User added!'
                })

            })
            .catch(error => {
                res.json({
                    message: 'Error!'
                })
            })
    })


};
const login = (req,res, next)=>{

}
module.exports = {
    signup
}