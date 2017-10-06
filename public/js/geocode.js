console.log("loaded geocode.js...");

var map;
var lat;
var lng;

$(document).ready(function(){

    $.ajax({
      method: 'GET',
      url: '/api/geocode',
      success: handleSuccess,
      error: handleError
    });

    function handleSuccess(results){
      var geocode = results;
      console.log("latitude ", geocode.results[0].geometry.location.lat);
      console.log("longitude ", geocode.results[0].geometry.location.lng);
      console.log("address ", geocode.results[0].formatted_address);
    }

    function handleError(err){
      console.log(err);
    }
});

function initMap(){
    // Map options
    var options = {
        zoom : 12,
        center : {lat:37.7749,lng:-122.431297}
    }
    // New map
    map = new google.maps.Map(document.getElementById('map'), options);
}
