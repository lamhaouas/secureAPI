const mongoose = require('mongoose');

const SauceSchema = mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    manufacturer: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    mainPepper: {
        type: String,
        require: true
    },
    imageUrl: {
        type: String,
        require: true
    },
    heat: {
        type: Number,
        min: 1,
        max: 10
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    usersLiked: [{
        type: String
    }], //array of users
    usersDisliked: [{
        type: String
    }], //array of users
});

module.exports = mongoose.model('Sauces', SauceSchema);