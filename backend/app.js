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
// Import the sauce model
const Sauce = require('./models/sauce');
// parse application/json
app.use(bodyParser.json())
app.use(express.json());
// Route Middlewares

app.use('/api/auth', userRoutes);
app.post('/api/sauces', (req, res, next) => {
    const sauce = new Sauce({
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
        mainPepper: req.body.mainPepper,
        //imageUrl:,
        heat: req.body.heat,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDislikde: []
    });
    sauce.save().then(
        () => {
            res.status(201).json({
                Message: 'posted'
            })
        }
    )
})

module.exports = app;