// This file allows us to seed our application with data
// simply run: 'node seed.js' from the root of this project folder.

const Location = require('./models/location');

let location_list = [
  {
    latitude: 37.7911281,
    longitude: -122.401254,
    address: '222 Bush St, San Francisco, CA 94104, USA'
  },
  {
    latitude: 37.801692,
    longitude: -122.413907,
    address:'865 Greenwich St, San Francisco, CA 94133, USA'
  },
  {
    latitude: 37.797935,
    longitude: -122.406262,
    address:'2 Romolo Pl, San Francisco, CA 94133, USA'
  }
];

Location.remove({}, function(err, locations){
  if(err){
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all locations');

    // create new records based on the array location_list
    Location.create(location_list, function(err, locations){
      if (err) { return console.log('err', err); }
      console.log('created', locations.length, "locations");
      process.exit();
    });
  }
})
