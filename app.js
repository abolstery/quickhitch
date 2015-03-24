require('./database.js');
var express = require('express'); 
var path = require('path');
var favicon = require('serve-favicon'); //icon
var logger = require('morgan'); // log requests to the console (express4)
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
//SET THE ROUTES!
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');
var mongoose = require('mongoose'); // mongoose is a Node.js library 
var routes = require('./routes/index');
var users = require('./routes/users');
var conferences = require('./routes/conferences');
var book = require('./routes/book');
var app = express(); // create our app w/ express
var http = require('http');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//mongoose.connect('mongodb://localhost/test'); 

//Configuration:
//using express modules to add more functionality to our application.
app.use(logger('dev')); //log every request to the console
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//routing information. send every request layout.jade
// app.all('/*', function(req, res, next) {
//         res.render('layout', {  });
//     });

//make db accessible to router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/conferences', conferences);
app.use('/book', book);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

http.createServer(app).listen(app.get('port'), function(){

});

module.exports = app;

