console.log('Sanity check!');

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
      url: '/api/request',
      success: handleSuccess,
      error: handleError
  });
}


function handleSuccess(results){
    var locations = results;
    console.log('success ajax', results);
    // create some html output that lists all the locations
    // so that the user can click on single location and be
    // redirected to localhost:3000/locations/:id
    var output = `
        <table>
            <tr>
                <th>Address</th>
                <th>Latitude</th>
                <th>Longitude</th>
            </tr>
    `;
    for(var i=0;i<locations.length;i++){
        lat = locations[i].latitude;
        lng = locations[i].longitude;
        addy = locations[i].address;
        output += `
            <tr>
                <td>${addy}</td>
                <td>${lat}</td>
                <td>${lng}</td>
            </tr>
        `;
        addMarker(lat,lng,map);
    }
    output += `
      </table>
    `;
    document.getElementById("htmlTarget").innerHTML = output;
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
