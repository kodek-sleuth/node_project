const multer = require('multer');

//Image Settings
const storage = multer.diskStorage({
    filename: function(req, file, cb)
    {
        cb(null, file.originalname)
    },

    destination: function(req, file, cb)
    {
        cb(null, './upload/')
    }
}) 

const fileFilter = (req, file, cb)=>{
    if(file.mimetype==='image/png' || file.mimetype==='image/jpeg')
    {
        cb(null, true);
    }

    else
    {
        cb(null, false);
    }
}

exports.upload = multer({storage: storage, limits: {fileSize: 1024 * 1024 * 1}, fileFilter: fileFilter})
