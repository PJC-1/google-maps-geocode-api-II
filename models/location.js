const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Location Schema
let locationSchema = new Schema({
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
