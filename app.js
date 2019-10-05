var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var User = require('./schema/user.schema');

var app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "HEAD,GET,POST,PATCH,OPTIONS,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var db = mongoose.connect('mongodb://admin:admin@cluster0-shard-00-00-4wa4f.mongodb.net:27017,cluster0-shard-00-01-4wa4f.mongodb.net:27017,cluster0-shard-00-02-4wa4f.mongodb.net:27017/origa?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority');

mongoose.connection.on('error', err => {
    console.log(err);
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
