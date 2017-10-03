# google-maps-geocode-api-II

- Using the express method res.sendFile() to load the plain HTML file instead of using a templating engine, since this small example will not need it.

- More info on sendFile() http://expressjs.com/en/api.html#res.sendFile

- Using google.maps.LatLng() is very useful for setting the geometry for a marker.
- Its a good idea to set the map variable in the global scope so that the Maps object is accessible throughout your script.
- Create a Location model that would be a resource in the datebase and would consist of the latitude, longitude, and the formatted address would be a good idea to start.
- DB Collection is 'locations'
- A good post about the difference between res.send() and res.json() https://stackoverflow.com/questions/19041837/difference-between-res-send-and-res-json-in-express-js
- When seeding the db you will not be able to access the model by caching the requiring of the models directory and then accessing the model as an object like database.Model, this will result in an error: "TypeError: Cannot read property 'remove' of undefined". You can debug this by first logging the cached database object and then logging the database.Model, which will return undefined. Solved the issue by requiring the resource's file directly (location.js).
