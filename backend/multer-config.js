const multer = require('multer');
const {
    replaceOne
} = require('./models/Sauce');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './images');
    },

    filename: (req, file, callback) => {

        const name = Date.now() + '--' + file.originalname;
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + '.' + extension)
    }
});


module.exports = multer({
    storage: storage
}).single('image');