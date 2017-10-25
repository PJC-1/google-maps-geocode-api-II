console.log('Sanity check!');

// Set map variable definition here to give the Maps object global scope
var id;
var map;
var lat;
var lng;
var address;


$(document).ready(function(){
    var windowPath = window.location.pathname;
    var windowPathSplit = windowPath.split('/');
    var id = windowPathSplit[2];
    var url = '/api/locations/' + id;


    initMap();

    $.ajax({
      method: 'GET',
      url: url,
      success: handleSuccess,
      error: handleError
    });
});

function addMarker(latitude,longitude,useMap){
    var latLng = new google.maps.LatLng(latitude, longitude);
    new google.maps.Marker({
        position: latLng,
        map:useMap
    });
}

function handleSuccess(result){
  console.log(result);
  var address = result.address;
  var lat = result.latitude;
  var lng = result.longitude;
  addMarker(lat,lng,map);
  var output = `
    <h3>Address: ${address}</h3>
  `;
  document.getElementById("formatted-address").innerHTML = output;

}

function handleError(err){
    console.log('error from ajax ', err);
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
