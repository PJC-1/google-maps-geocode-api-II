console.log('Sanity check!');

// Set map variable definition here to give the Maps object global scope
var id;
var map;
var lat;
var lng;
var address;


$(document).ready(function(){

    initMap();
    fetchLocations();
    $("#htmlTarget").on("click", ".location", function(e){
      var id = $(this).closest('.location').data('location-id');
      console.log(id);
      window.location.href = '/locations/' + id;
    });
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
    // server reponse
    var locations = results;
    // html output
    var output = `
        <table>
            <tr>
                <th>Address</th>
                <th>Latitude</th>
                <th>Longitude</th>
            </tr>
    `;
    // loop through server response
    for(var i=0;i<locations.length;i++){
        id = locations[i]._id;
        lat = locations[i].latitude;
        lng = locations[i].longitude;
        address = locations[i].address;
        // add to the html ouput, as table row
        output += `
            <tr data-location-id="${id}" class="location" >
                <td><span id="locationTR">${address}</span></td>
                <td>${lat}</td>
                <td>${lng}</td>
            </tr>
        `;
        // add marker to the map
        addMarker(lat,lng,map);
    }
    // end html output, closing table tag
    output += `
        </table>
    `;
    // displaying the ouput in the html view
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
