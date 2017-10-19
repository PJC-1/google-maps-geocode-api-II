const mongoose = require('mongoose');
const config = require('../config/database');
// Connect to mongodb
mongoose.connect(config.database);
let db = mongoose.connection;

// Check for DB errors
db.on('error', function(err){
  console.log(err);
})

// Check connection
db.once('open', function(){
  console.log('connected to mongodb');
});

// Check this because this might be why it doesn't work
// Bring in Models
module.exports.Location = require('./location');
module.exports.User = require('./user');
