const mongoose = require('mongoose');
const schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);