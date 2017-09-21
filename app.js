const express = require('express');
const dotenv = require('dotenv');

// DOTENV
dotenv.config();

console.log(process.env.YOUR_API_KEY);

// Init app
const app = express();

app.get('/', function(req, res){
    res.send('Hello World');
});

app.listen(3000, function(){
    console.log('You are now listening to the smooth sounds of port 3000...');
});
