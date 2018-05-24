const express = require('express');
const multer  = require('multer');
const router = express.Router();

const tool = require('../lib/tool.js');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        let ext = file.originalname.split('.').pop();
        let rand = Math.round(Math.random() * 99999999);
        let name = [
            file.fieldname,
            tool.getSult(),
            rand
        ].join('_') + '.' + ext;
        cb(null, name);
    }
});

var upload = multer({storage})

router.post('/upload', upload.single('file1'), (req, res) => {
    console.log(req.file);
    res.send('success');
});

module.exports = router;