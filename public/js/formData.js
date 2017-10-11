console.log("formData.js...");

var map;
var lat;
var lng;

$(document).ready(function(){
    initMap();

    $('#location-form').on('submit', function(event){
        event.preventDefault();
        console.log($(this).serialize());
        $.ajax({
          method: 'POST',
          url: '/api/formData',
          data: $(this).serialize(),
          success: handleSuccess,
          error: handleError
        });
    });

});

function handleSuccess(results){
    console.log(results);
}

function handleError(err){
    console.log(err);
}

function addMarker(latitude,longitude,useMap){
    var latLng = new google.maps.LatLng(latitude, longitude);
    new google.maps.Marker({
        position: latLng,
        map:useMap
    });
}

function initMap(){
    // Map options
    var options = {
        zoom : 12,
        center : {lat:37.7749,lng:-122.431297}
    }
    // New map
    map = new google.maps.Map(document.getElementById('map'), options);
}
