const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dbConfig = require('./config/database');
const methodOverride = require('method-override');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./'));

mongoose.connect(dbConfig.db, {
    useNewUrlParser: true
}).then(() => {
    console.log('Database connected');
},
    error => {
        console.log('Database could not be connected : ' + error);
    }
)

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));
//router
const compressorRoute = require('./routes/compressor.route');
app.use('/api/compressor', compressorRoute)

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
});


