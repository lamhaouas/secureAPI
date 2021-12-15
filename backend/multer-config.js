const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './images');
    },

    filename: (req, file, callback) => {

        const name = Date.now() + '--' + file.originalname;
        callback(null, name )
    }
});


module.exports = multer({
    storage: storage
}).single('image');