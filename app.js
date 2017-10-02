const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// DOTENV
dotenv.config();

// Init app
const app = express();

// serve static files in public
app.use(express.static(path.join(__dirname, 'public')));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended : true }));

// db
let database = require('./models');
let Location = require('./models/location');

let locations = [
  {
    _id: 20,
    latitude: 37.7911281,
    longitude: -122.401254,
    address: '222 Bush St, San Francisco, CA 94104, USA'
  },
  {
    _id: 21,
    latitude: 37.801692,
    longitude: -122.413907,
    address:'865 Greenwich St, San Francisco, CA 94133, USA'
  },
  {
    _id: 22,
    latitude: 37.797935,
    longitude: -122.406262,
    address:'2 Romolo Pl, San Francisco, CA 94133, USA'
  }
];

////////////////////
// HTML ENDPOINTS //
////////////////////

// root
app.get('/', function(req, res){
  res.sendFile('views/index.html', {root : __dirname});
});

app.get('/request', function(req, res){
  res.sendFile('views/request.html', {root : __dirname});
})


////////////////////////
// JSON API ENDPOINTS //
////////////////////////

// get all locations
app.get('/api/locations', function(req, res){
  res.json(locations);
});

app.listen(3000, function(){
  console.log('You are now listening to the smooth sounds of port 3000...');
});
