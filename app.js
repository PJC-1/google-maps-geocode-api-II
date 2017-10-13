const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const request = require('request');
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

app.get('/geocode', function(req, res){
    res.sendFile('views/geocode.html', {root : __dirname});
})

app.get('/formData', function(req, res){
    res.sendFile('views/formData.html', {root : __dirname});
});


////////////////////////
// JSON API ENDPOINTS //
////////////////////////

// get all locations
app.get('/api/locations', function(req, res){
    res.json(locations);
});

// server request to the database
app.get('/api/request', function(req, res){
    Location.find({}, function(err, results){
        if(err){
            console.log('error making request from the server...');
        } else {
            console.log(results);
            res.json(results);
        }
    });
});

// server request to geocode API
let apiKEY = process.env.YOUR_API_KEY;
let baseURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
let address = '222 Bush St, San Francisco, CA 94104, USA';
let url = baseURL + address + "&key=" + apiKEY;

app.get('/api/geocode', function(req, res){
    request.get(url, function(error, response, body){
        if(error){
            res.send('error from req to geocode API', error);
        } else {
            var geocodeOutput = JSON.parse(body);
            res.json(geocodeOutput);
        }
    });
});

// server request to geocode API with form data
app.post('/api/formData', function(req,res){
    // logging the form field value from the ajax request object
    console.log(req.body.location);
    let searchAddress = req.body.location;
    let searchUrl = baseURL + searchAddress + "&key=" + apiKEY;
    request.get(searchUrl, function(error, response, body){
        if(error){
            res.send('error from req to geocode API', error);
        } else {
            var geocodeOutput = JSON.parse(body);
            var lat = geocodeOutput.results[0].geometry.location.lat;
            var lng = geocodeOutput.results[0].geometry.location.lng;
            var formattedAddress = geocodeOutput.results[0].formatted_address;
            console.log(lat);
            console.log(lng);
            console.log(address);
            var newLocation = new Location({
                latitude  : lat,
                longitude : lng,
                address   : formattedAddress
            });
            newLocation.save(function(err, result){
                if(err){
                    console.log("issue saving the location...", err);
                    return;
                } else {
                    console.log("new location is saved to the db...", result);
                }
            });
            // from here you can create a new location object
            // the save the new location to the db
            // then send the saved entry to the client
            res.json(geocodeOutput);
        }
    })

});


app.listen(3000, function(){
    console.log('You are now listening to the smooth sounds of port 3000...');
});
