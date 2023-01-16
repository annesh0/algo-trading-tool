const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const config = require('./config.json');
const mongoose = require('mongoose');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

const app = express();

app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('view engine', 'jade');

const conn = mongoose.createConnection(config['ATLAS_URI']);

let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
})

var storage = new GridFsStorage({
    url: config['ATLAS_URI'],
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
});
const upload = multer({ storage });

//@route POST, Upload
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({file: req.file})
})

const port = 5001

app.listen(port, () => console.log(`Server is listening to port ${port}`));

