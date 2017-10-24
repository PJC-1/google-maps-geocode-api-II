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
    // // server reponse
    // var locations = results;
    // // html output
    // var output = `
    //     <table>
    //         <tr>
    //             <th>Address</th>
    //             <th>Latitude</th>
    //             <th>Longitude</th>
    //         </tr>
    // `;
    // // loop through server response
    // for(var i=0;i<locations.length;i++){
    //     // think about using the _id value to add to the location in the html output
    //     // that way you can create a click event to listen for and have the data-id
    //     // available to send along with the request to the server.
    //     id = locations[i]._id;
    //     lat = locations[i].latitude;
    //     lng = locations[i].longitude;
    //     address = locations[i].address;
    //     // add to the html ouput, as table row
    //     output += `
    //         <tr data-location-id="${id}" class="location" >
    //             <td><span id="locationTR">${address}</span></td>
    //             <td>${lat}</td>
    //             <td>${lng}</td>
    //         </tr>
    //     `;
    //     // add marker to the map
    //     addMarker(lat,lng,map);
    // }
    // // end html output, closing table tag
    // output += `
    //     </table>
    // `;
    // // displaying the ouput in the html view
    // document.getElementById("htmlTarget").innerHTML = output;
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
