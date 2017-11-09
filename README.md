# google-maps-geocode-api-II

- Using the express method res.sendFile() to load the plain HTML file instead of using a templating engine, since this small example will not need it.

- More info on sendFile() http://expressjs.com/en/api.html#res.sendFile

- Using google.maps.LatLng() is very useful for setting the geometry for a marker.
- Its a good idea to set the map variable in the global scope so that the Maps object is accessible throughout your script.
- Create a Location model that would be a resource in the datebase and would consist of the latitude, longitude, and the formatted address would be a good idea to start.
- DB Collection is 'locations'
- A good post about the difference between res.send() and res.json() https://stackoverflow.com/questions/19041837/difference-between-res-send-and-res-json-in-express-js
- When seeding the db you will not be able to access the model by caching the requiring of the models directory and then accessing the model as an object like database.Model, this will result in an error: "TypeError: Cannot read property 'remove' of undefined". You can debug this by first logging the cached database object and then logging the database.Model, which will return undefined. Solved the issue by requiring the resource's file directly (location.js).
- Here is a really good stackoverflow about the difference between making your request to the geocode api from the client or the server. https://stackoverflow.com/questions/37001749/how-to-implement-geocoding-responses-using-nodejs-javascript
- I was getting 'Uncaught ReferenceError: google is not defined' error message, on initial load in the browsers (and my markers would not be displayed until the browser was refreshed). It had to do with the timing of things being loaded, google maps api script, ajax requests to geocode api, the initMap function, and the addMarker function for the ajax response. I was able to resolve the issue by removing 'async defer' and 'callback=' attributes from the google maps api script tag. This made the loading synchronous, which makes more sense when using the google maps api with jquery because it makes orchestrating all the different loadings more manageable. This is explained in the google maps api documentation. It notes that subsequent script tags will not execute until the API is fully loaded. A quick search for such issues had a lot of solutions with 'google.maps.event.addDomListener(window, 'load', initialize);' but did not resolve my particular issue. The google api docs were the most helpful with this issue.
https://developers.google.com/maps/documentation/javascript/examples/map-sync
- I was dealing with an issue where my form was wired correctly, but when I attempted to console log $(this).serialize() it would log an empty value, this was because you need to provide the name attribute in the html (i.e. name="location"). This is brought up in this stackoverflow
https://stackoverflow.com/questions/13168484/jquerys-serialize-doesnt-do-anything
- When dynamically creating html output creating the data-id, I had to change this attribute name to data-location-id, and then use jquery to access the `_id` by doing something like `var id = $(this).closest('.location').data('location-id');`
- Helpful link to google maps API documentation for removing markers
https://developers.google.com/maps/documentation/javascript/examples/marker-remove
- A good link for removing a previous marker:
https://stackoverflow.com/questions/42020268/remove-previous-marker-google-maps
