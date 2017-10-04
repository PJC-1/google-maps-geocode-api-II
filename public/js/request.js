console.log('Sanity check!');

// Set map variable definition here to give the Maps object global scope
var map;

$(document).ready(function(){
    $.ajax({
        method: 'GET',
        url: '/api/request',
        success: handleSuccess,
        error: handleError
    });

    function handleSuccess(results){
      var locations = results;
      console.log('success ajax', results);
      for(var i=0;i<locations.length;i++){
        var lat = locations[i].latitude;
        var lng = locations[i].longitude;
        addMarker2(lat,lng,map);
      }

    }

    function handleError(err){
      console.log('error from ajax ', err);
    }

    // addMarker2
    function addMarker2(latitude,longitude,useMap){
      var latLng = new google.maps.LatLng(latitude, longitude);
      new google.maps.Marker({
          position: latLng,
          map:useMap
      });
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
