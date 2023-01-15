// const express = require("express");
// const app = express();
// const cors = require("cors");
// require("dotenv").config({ path: "./config.env" });
// const port = process.env.PORT || 4000;
// app.use(cors());
// app.use(express.json());
// //app.use(require("./routes/record"));
// app.use(require("./routes/files"));
// // get driver connection
// const dbo = require("./db/conn");
 
// app.listen(port, () => {
//   // perform a database connection when server starts
//   dbo.connectToServer(function (err) {
//     if (err) console.error(err);
 
//   });
//   console.log(`Server is running on port: ${port}`);
// });

// let express = require('express'),
//     mongoose = require('mongoose'),
//     cors = require('cors'),
//     bodyParser = require('body-parser'),
//     dbConfig = require('./database/db');

// const api = require('../backend/routes/user.routes')

// // MongoDB Configuration
// mongoose.Promise = global.Promise;
// mongoose.connect(dbConfig.db, {
//     useNewUrlParser: true
// }).then(() => {
//     console.log('Database sucessfully connected')
// },
//     error => {
//         console.log('Database could not be connected: ' + error)
//     }
// )

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

app.use('/public', express.static('public'));

app.use('/api', api)

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

app.use((req, res, next) => {
    // Error goes via `next()` method
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});