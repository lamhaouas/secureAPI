const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config()
const path = require('path');
// parse application/json
app.use(bodyParser.json())
app.use(express.json());
//Import routes
const userRoutes = require('./routes/auth');
const sauceRoutes = require('./routes/sauce');

//CORS
const cors = require('cors');
app.use(cors());

// connect to Mongodb
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true
}).then(() => {
    console.log('Connected to MongoDB')

}).catch((error) => {
    console.log('not connected to MongoDB');
    console.error(error);
})



// Route Middlewares
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;