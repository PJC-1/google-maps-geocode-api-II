const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const axios = require('axios');

// DOTENV
dotenv.config();

// Connect to mongodb
mongoose.connect('mongodb://localhost/googleAPI');
let db = mongoose.connection;

// Check for DB errors
db.on('error', function(err){
  console.log(err);
})

// Check connection
db.once('open', function(){
    console.log('connected to mongodb');
});

// Init app
const app = express();

// Bring in Models
let Location = require('./models/location');

// Load View
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set public directory
app.use(express.static(path.join(__dirname, 'public')));

// Test making a request with axios
let url = 'https://maps.googleapis.com/maps/api/geocode/json';
let location = '865 Greenwich St, San Francisco, CA 94133, USA';


// Tester
app.get('/pug', function(req, res){
  res.sendFile(__dirname + '/views/pug.html');
});

// Home Route
app.get('/', function(req, res, next){
    // options object for the sendFile method
    var options = {
        root     : __dirname + '/views/',
        dotfiles : 'deny',
        headers  : {
            'x-timestamp' : Date.now(),
            'x-sent'      : true
        }
    };

    var fileName = 'index.html'
    Location.find({}, function(err, locations){
        if(err){
            console.log(err);
        } else {
            console.log(locations);
            res.sendFile(fileName, options, function(err){
                if(err) {
                    next(err);
                } else {
                    console.log('Sent:', fileName);
                }
            });
        }
    });
});

app.listen(3000, function(){
    console.log('You are now listening to the smooth sounds of port 3000...');
});
