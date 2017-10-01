const mongoose = require('mongoose');
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
let Location = module.exports = require('./location');
