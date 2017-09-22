const express = require('express');
const path = require('path');
const dotenv = require('dotenv');


// DOTENV
dotenv.config();

console.log(process.env.YOUR_API_KEY);

// Init app
const app = express();

// Load View
app.set('views', path.join(__dirname, 'views'));

// Set public directory
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', function(req, res, next){
    var options = {
      root: __dirname + '/views/',
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };

    var fileName = 'index.html'
    res.sendFile(fileName, options, function(err){
        if(err) {
          next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});

app.listen(3000, function(){
    console.log('You are now listening to the smooth sounds of port 3000...');
});
