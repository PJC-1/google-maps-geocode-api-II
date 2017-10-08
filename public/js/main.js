console.log("Sanity Check: JS is working!");
// Set map variable definition here to give the Maps object global scope
var map;
var lat;
var lng;

$(document).ready(function(){

    initMap();
    fetchLocations();

});

function addMarker(latitude,longitude,useMap){
    var latLng = new google.maps.LatLng(latitude, longitude);
    new google.maps.Marker({
        position: latLng,
        map:useMap
    });
}

function fetchLocations(){
    $.ajax({
        method: 'GET',
        url: '/api/locations',
        success: handleSuccess,
        error: handleError
    });
}

function handleSuccess(response){
    var locations = response;
    console.log('logging server response: ', locations);
    for( var i=0 ; i<locations.length ; i++ ){
        lat = locations[i].latitude;
        lng = locations[i].longitude;
        addMarker(lat,lng,map);
    }
}

function handleError(err){
    console.log(err);
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
