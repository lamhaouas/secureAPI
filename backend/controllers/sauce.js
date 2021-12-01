const Sauce = require('../models/Sauce');
// access the file system 
const fs = require('fs')

// submit a sauce
exports.submitSauce = async (req, res, ) => {
    // convert req string to JSON obj
    req.body.sauce = JSON.parse(req.body.sauce);
    // the full image path
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

    try {
        const savedSauce = await sauce.save();
        res.json('Sauce saved')
    } catch {
        res.status(400).json({
            message: err
        })
    }
};
// Get all sauces
exports.getAllSauces = async (req, res) => {
    try {
        const allSauces = await Sauce.find();
        res.status(200).json(allSauces)
    } catch {
        res.status(200).json({
            message: err
        })
    }
}
// Get one sauces
exports.getOneSauce = async (req, res) => {
    try {
        const findOneSauce = await Sauce.findOne({
            _id: req.params.id
        });
        const filename = await findOneSauce.imageUrl.split("/images/");
        res.status(200).json(findOneSauce)
    } catch {
        res.status(404).json({
            message: err
        })
    }
}


// Delete a sauce
exports.deleteSauce = async (req, res) => {
    try {
        const sauceToDelete = await Sauce.findOne({
            _id: req.params.id
        })
        const filename = await sauceToDelete.imageUrl.split("/images/")[1];
        fs.unlink('images/' + filename, () => {
            sauceToDelete.deleteOne({
                _id: req.params.id
            });

            res.status(200).json('Sauce deleted');
        })
    } catch {
        res.status(200).json('error')
    };
}