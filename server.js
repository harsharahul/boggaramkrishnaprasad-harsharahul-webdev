var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// // Passport configuration
 var passport      = require('passport');
 var cookieParser  = require('cookie-parser');
 var session       = require('express-session');

app.use(session({
    secret: "hahaha!!!"//process.env.SESSION_SECRET, //Store it in process.env.SESSION_SECRET
    //resave: true,
    //saveUninitialized: true
}));
 app.use(cookieParser());
 app.use(passport.initialize());
 app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);

//This is the server created for the Webdev assignment
require ("./assignment/app.js")(app);

//This is the server created for the Webdev Project
require ("./project/app.js")(app);


var port = process.env.PORT || 3000;

app.listen(port);