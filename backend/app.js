const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
//Import user route
const userRoutes = require('./routes/auth');

//CORS
const cors = require('cors');
app.use(cors());

// connect to Mongodb

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true
}).then(() => {
    console.log('Connected to MondoDB')

}).catch((error) => {
    console.log('not connected to MongoDB');
    console.error(error);
})

// parse application/json
app.use(bodyParser.json())
app.use(express.json());
// Route Middlewares

app.use('/api/auth', userRoutes);


module.exports = app;