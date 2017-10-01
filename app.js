const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const axios = require('axios');
const bodyParser = require('body-parser');

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

// Bring in Models
let Location = require('./models/location');

// Init app
const app = express();

// Set public directory
app.use(express.static(path.join(__dirname, 'public')));

// Test making a request with axios
// let url = 'https://maps.googleapis.com/maps/api/geocode/json';
// let location = '865 Greenwich St, San Francisco, CA 94133, USA';

// Home Route
app.get('/', function(req, res, next){
  Location.find({}, function(err, locations){
    if(err){
      console.log(err);
    } else {
      console.log(locations);
      res.sendFile('views/index.html', {root : __dirname});
    }
  });
});

// Tester
app.get('/pug', function(req, res){
  res.sendFile(__dirname + '/views/pug.html');
});


app.listen(3000, function(){
  console.log('You are now listening to the smooth sounds of port 3000...');
});
