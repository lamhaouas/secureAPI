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
        await sauce.save();
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
        res.status(404).json({
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
        res.status(403).json('error')
    };
};
// Update a sauce
exports.updateSauce = async (req, res) => {
    let sauce = new Sauce({
        _id: req.params.id
    });

    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        const reqSauce = JSON.parse(req.body.sauce);
        sauce = {
            _id: req.params.id,
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
        }
    } else {
        sauce = {
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
        }, sauce);
        await res.status(201).json({
            message: 'Sauce updated'
        });
    } catch {
        res.status(403).json('error')
    }
}
// Like/Dislike sauce
exports.rateSauce = async (req, res) => {


    try {
        // get one sauce
        const sauce = await Sauce.findOne({
            _id: req.params.id
        });

        // like the sauce
        if (req.body.like == 1) {
            sauce.usersLiked.push(req.body.userId);
            sauce.likes += 1;
        }
        // unlike the sauce 
        else if (req.body.like == 0 && sauce.usersLiked.includes(req.body.userId)) {
            sauce.usersLiked.remove(req.body.userId);
            sauce.likes -= 1;
        }
        // dislike the sauce
        else if (req.body.like == -1) {
            sauce.usersDisliked.push(req.body.userId);
            sauce.dislikes += 1
        }
        // undislike the sauce
        else if (req.body.like == 0 && sauce.usersDisliked.includes(req.body.userId)) {
            sauce.usersDisliked.remove(req.body.userId);
            sauce.dislikes -= 1
        }

        // save to db & res with success status
        sauce.save();
        res.status(201).json({
            message: "sauce like saved"
        })

    } catch (err) {
        res.status(404).json({
            message: "error"
        });
    }
}