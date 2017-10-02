console.log('Sanity check!');

// Set map variable definition here to give the Maps object global scope
var map;

function initMap(){
    // Map options
    var options = {
        zoom : 12,
        center : {lat:37.7749,lng:-122.431297}
    }
    // New map
    map = new google.maps.Map(document.getElementById('map'), options);
}

// addMarker2
function addMarker2(latitude,longitude,useMap){
  var latLng = new google.maps.LatLng(latitude, longitude);
  new google.maps.Marker({
      position: latLng,
      map:useMap
  });
}
