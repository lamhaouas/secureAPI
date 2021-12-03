const Sauce = require('../models/Sauce');
// access the file system 
const fs = require('fs')

// submit a sauce
exports.submitSauce = async (req, res, ) => {
    // convert req string to JSON obj
    const reqSauce = JSON.parse(req.body.sauce);
    // the full image path
    const url = req.protocol + '://' + req.get('host');
    const sauce = new Sauce({
        userId: reqSauce.userId,
        name: reqSauce.name,
        manufacturer: reqSauce.manufacturer,
        description: reqSauce.description,
        mainPepper: reqSauce.mainPepper,
        imageUrl: url + '/images/' + req.file.filename,
        heat: reqSauce.heat,
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
};
// Update a sauce
exports.updateSauce = async (req, res) => {
    let sauce = new Sauce({
        _id: req.params.id
    });

    // Update sauce with a new image file
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        const reqSauce = JSON.parse(req.body.sauce);
        hotSauce = {
            _id: req.params.id,
            userID: reqSauce.userID,
            name: reqSauce.name,
            manufacturer: reqSauce.manufacturer,
            description: reqSauce.description,
            mainPepper: reqSauce.mainPepper,
            imageUrl: url + '/images/' + req.file.filename,
            heat: reqSauce.heat,
            likes: 0,
            dislikes: 0,
            usersLiked: [],
            usersDislikde: []
        }
    } else {
        hotSauce = {
            _id: req.params.id,
            name: req.body.name,
            manufacturer: req.body.manufacturer,
            description: req.body.description,
            mainPepper: req.body.mainPepper,
            imageUrl: req.body.imageUrl,
            heat: req.body.heat,
        };
    };
    try {
        await Sauce.updateOne({
            _id: req.params.id
        }, hotSauce);
        res.status(201).json({
            message: 'Sauce updated'
        });
    } catch (err) {
        res.status(400).json({
            message: err
        });
    }
}