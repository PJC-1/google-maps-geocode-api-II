console.log("Sanity Check: JS is working!");
// Get Location form
var locationForm = document.getElementById('location-form');
// Set map variable definition here to give the Maps object global scope
var map;

$(document).ready(function(){
  $.ajax({
    method: 'GET',
    url: '/api/locations',
    success: handleSuccess,
    error: handleError
  });
});

function handleSuccess(json){
  allLocations = json;
  console.log('logging server response: ', allLocations);
}

function handleError(err){
  console.log(err);
}

// Listen for submit
// locationForm.addEventListener('submit', geocode);
//
// function geocode(e){
//     // Precent actual submit
//     e.preventDefault();
//
//     var location = document.getElementById('location-input').value;
//
//     axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
//         params:{
//             address: location,
//             key:'AIzaSyAD_OJUoh5BPPl1WUGJEl3G9WMj4taITLs'
//         }
//     })
//     .then(function(response){
//         // Log full response
//         console.log(response);
//
//         // Format response
//         var formattedAddress = response.data.results[0].formatted_address;
//         console.log(formattedAddress);
//         var formattedAddressOutput = `
//           <ul class="list-group">
//             <li class="list-group-item">${formattedAddress}</li>
//           </ul>
//         `;
//
//         // Address Components
//         var addressComponents = response.data.results[0].address_components;
//         console.log(addressComponents);
//         var addressComponentsOutput = `<ul class="list-group">`;
//         for(var i = 0;i < addressComponents.length;i++){
//             addressComponentsOutput += `
//               <li class="list-group-item"><strong>${addressComponents[i].types[0]}</strong>: ${addressComponents[i].long_name}</li>
//             `
//         }
//         addressComponentsOutput += '</ul>';
//
//         // Geometry
//         var lat = response.data.results[0].geometry.location.lat;
//         var lng = response.data.results[0].geometry.location.lng;
//         var geometryOutput = `
//           <ul class="list-group">
//             <li class="list-group-item"><strong>Latitude</strong>: ${lat}</li>
//             <li class="list-group-item"><strong>Longitude</strong>: ${lng}</li>
//           </ul>
//         `;
//
//         // Output to app
//         document.getElementById('formatted-address').innerHTML = formattedAddressOutput;
//         document.getElementById('address-components').innerHTML = addressComponentsOutput;
//         document.getElementById('geometry').innerHTML = geometryOutput;
//
//         addMarker2(lat,lng,map);
//
//         var testHtml = testTemplate(lat);
//         $('#test-div').html(testHtml);
//
//     })
//     .catch(function(error){
//         console.log(error);
//     });
// }

function initMap(){
    // Map options
    var options = {
        zoom : 12,
        center : {lat:37.7749,lng:-122.431297}
    }

    // New map
    map = new google.maps.Map(document.getElementById('map'), options);

    // Listen for click on map
    google.maps.event.addListener(map, 'click',
      function(event){
        // Add marker
        addMarker({coords:event.latLng});
    });

    var markers = [
        {
          coords:{lat:37.7911281,lng:-122.401254},
          iconImage:'http://maps.google.com/mapfiles/ms/micons/purple-dot.png',
          content:'<h1>222 Bush Street</h1>'
        },
        {
          coords:{lat:37.789578,lng:-122.414261}
        }
    ];

    // Loop through markers
    for(var i=0;i<markers.length;i++){
      addMarker(markers[i]);
    }
}

// addMarker2
function addMarker2(latitude,longitude,useMap){
  var latLng = new google.maps.LatLng(latitude, longitude);
  new google.maps.Marker({
      position: latLng,
      map:useMap
  });
}


// Add Marker Function
function addMarker(props){
  var marker = new google.maps.Marker({
      position: props.coords,
      map:map
  });
  // Check for customicon
  if(props.iconImage){
      // Set icon image
      marker.setIcon(props.iconImage);
  }
  // Check for content
  if(props.content){
      var infoWindow = new google.maps.InfoWindow({
          content:props.content
      });

      marker.addListener('click', function(){
          infoWindow.open(map, marker);
      });
  }
}
