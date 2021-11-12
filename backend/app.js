const express = require('express');
const mongoose = require('mongoose');
const bodyPareser = require('body-parser');
const app = express();
//Import user route
const userRoutes = require('./routes/auth');

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
// connect to db
mongoose.connect('mongodb+srv://new_user:JcxEdfvrUHLIGvkc@cluster0.fqgzg.mongodb.net/SECUREAPI?retryWrites=true&w=majority').then(() => {
        console.log('Successfully connected to MongoDB Atlas!');
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error);
    });
app.use((req, res) => {
    res.json({
        message: 'Your request was successful!'
    });
});
app.use('/', userRoutes);


module.exports = app;