const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const request = require('request');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// DOTENV
dotenv.config();

// Init app
const app = express();

// serve static files in public
app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware
app.use(session({
 secret: 'secret',
 resave: true,
 saveUninitialized: true
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function(req, res, next){
   res.locals.messages = require('express-messages')(req, res);
   next();
});

// Express Validator Middleware
app.use(expressValidator({
 errorFormatter: function(param, msg, value) {
     var namespace = param.split('.')
     , root    = namespace.shift()
     , formParam = root;

   while(namespace.length) {
     formParam += '[' + namespace.shift() + ']';
   }
   return {
     param : formParam,
     msg   : msg,
     value : value
   };
 }
}));



// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended : true }));

// db
let database = require('./models');
let Location = require('./models/location');
let User = require('./models/user')

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

//  Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});

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

app.get('/users/register', function(req, res){
    res.sendFile('views/register.html', {root : __dirname});
});

app.get('/users/login', function(req, res){
  res.sendFile('views/login.html', {root : __dirname});
});

app.get('/locations/:id', function(req, res){
  res.sendFile('views/location.html', {root : __dirname});
});

app.get('/locations/:id/edit', function(req, res){
  res.sendFile('views/editLocation.html', {root : __dirname});
});

// Login Process
app.post('/users/login', function(req, res, next){
  passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/users/login',
    failureFlash: true
  })(req, res, next);
});

app.post('/users/register', function(req, res){
  console.log('testing post to /users/register');

  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  let newUser = new User({
    name:name,
    email:email,
    username:username,
    password:password
  });

  bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
          if(err){
              console.log(err);
          } else {
              newUser.password = hash;
              newUser.save(function(err){
                  if(err){
                      console.log(err);
                      return;
                  } else {
                      console.log("user has been created...");
                      res.redirect('/users/login');
                  }
              });
          }
      });
  });
});

////////////////////////
// JSON API ENDPOINTS //
////////////////////////

// get all locations
app.get('/api/locations', function(req, res){
    res.json(locations);
});

app.get('/api/locations/:id', function(req, res){
  console.log(req.params.id);
  Location.findById({_id:req.params.id}, function(err, result){
      if(err){
        console.log("error making request to db from the server...");
      } else {
        console.log(result);
        res.json(result);
      }
  });
});

app.delete('/api/locations/:id', function(req, res){
  Location.findOneAndRemove({_id:req.params.id}, function(err, location){
    if(err){
      console.log(err);
    } else {
      res.json(location);
    }
  });
});

app.put('/api/locations/:id', function(req, res){
  console.log(req.body.address);
  console.log(req.body.latitude);
  console.log(req.body.longitude);

  // 1. Find the Location, use the mongoose method findById with req.params.id
  Location.findById({_id:req.params.id}, function(err, result){
    if(err){
      console.log(err);
    } else {
      // 2. If the Location if found in the DB, then set the values one by one to the new values from the form.
      result.latitude = req.body.latitude;
      result.longitude = req.body.longitude;
      result.address = req.body.address;
      // 3. Use the .save() method to save the updated Location and use res.json to send the updated Location back to the client.
      result.save(function(err, updatedItem){
        if(err){
          console.log(err);
        } else {
          res.json(updatedItem);
        }
      });
    }
  });
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


app.post('/api/newRequest', function(req, res){
    let reqAddress = req.body.location;
    console.log(reqAddress);
    let reqUrl = baseURL + reqAddress + "&key=" + apiKEY;
    console.log(reqUrl);
    request.get(reqUrl, function(error, response, body){
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
                    res.json(result);
                }
            });
        }
    })
});

app.listen(3000, function(){
    console.log('You are now listening to the smooth sounds of port 3000...');
});
