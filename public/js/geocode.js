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
      console.log(geocode);
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
