const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Location Schema
// notice here that locationSchema is spelled with a lower case "l",
// by convention it should be a capital "L", this is also inconsistent
// with what is in the index.js file, which is why it doesn't work.
const locationSchema = new Schema({
    latitude : {
        type     : Number,
        required : true
    },
    longitude : {
        type     : Number,
        required : true
    },
    address : {
        type     : String,
        required : true
    }
});

let Location = module.exports = mongoose.model('Location', locationSchema);
