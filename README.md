# google-maps-geocode-api-II

- Using the express method res.sendFile() to load the plain HTML file instead of using a templating engine, since this small example will not need it.

- More info on sendFile() http://expressjs.com/en/api.html#res.sendFile

- Using google.maps.LatLng() is very useful for setting the geometry for a marker.
- Its a good idea to set the map variable in the global scope so that the Maps object is accessible throughout your script.

- This to do with this mini project:
- Set up mongoDB
- Create a Location model that would be a resource in the datebase and would consist of the latitude and longitude.
