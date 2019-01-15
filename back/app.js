const express = require('express');
const logger = require('morgan');
const path = require('path');

const indexRouter = require(path.join(__dirname, 'routes/index'));

const app = express();

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404);
    res.json('Requested resource is not found');
});

// error handler
app.use(function(err, req, res, next) {
    const error = req.app.get('env') === 'development' ? err : {};
    const status = err.status || 500;

    res.status(status);
    res.json(err.message);
});

module.exports = app;
