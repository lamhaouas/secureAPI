const Sauce = require('../models/Sauce');
// access the file system 
const fs = require('fs')
// submit a sauce
exports.submitSauce = (req, res, ) => {
    // convert req string to JSON obj
    req.body.sauce = JSON.parse(req.body.sauce);
    // image url
    const url = req.protocol + '://' + req.get('host');
    const sauce = new Sauce({
        userId: req.body.sauce.userId,
        name: req.body.sauce.name,
        manufacturer: req.body.sauce.manufacturer,
        description: req.body.sauce.description,
        mainPepper: req.body.sauce.mainPepper,
        imageUrl: url + '/images/' + req.file.filename,
        heat: req.body.sauce.heat,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDislikde: []
    });

    sauce.save().then()

};
// Get all sauces
exports.getAllSauces = (req, res) => {
    Sauce.find().then(data => res.status(200).json(data))
        .catch(error => res.status(400).json({
            error
        }));
}

// Delete a sauce