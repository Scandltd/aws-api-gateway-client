const express = require('express');
const logger = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const response = require(path.join(__dirname, 'components/response'));
const validationErrorNormalizer = require(path.join(__dirname, 'components/validationErrorNormalizer'));

const indexRouter = require(path.join(__dirname, 'routes/index'));
const accountRouter = require(path.join(__dirname, 'routes/account'));

// Set up mongoose connection
const dbUrl = `mongodb://${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_NAME}?authSource=admin`;
const options = {
    user: process.env.MONGO_DB_USER,
    pass: process.env.MONGO_DB_PASSWORD,
    useNewUrlParser: true,
    authMechanism:'SCRAM-SHA-1',
};

mongoose.connect(dbUrl, options);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/account', accountRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404);
    res.json('Requested resource is not found');
});

// error handler
app.use(function(err, req, res, next) {
    console.log(err);
    if (err.name === 'ValidationError') {
        res.status(422);
        res.json(response.error(err.message, validationErrorNormalizer.normalizeErrors(err.errors)));

        return ;
    }

    const error = req.app.get('env') === 'develop' ? err : {};
    const status = err.status || 500;

    res.status(status);
    res.json(response.error(err.message, error));
});

module.exports = app;
