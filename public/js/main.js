// Get Location form
var locationForm = document.getElementById('location-form');
// Set map variable definition here to give the Maps object global scope
var map;

// Listen for submit
locationForm.addEventListener('submit', geocode);

function geocode(e){
    // Precent actual submit
    e.preventDefault();

    var location = document.getElementById('location-input').value;

    axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
        params:{
            address: location,
            key:'AIzaSyAD_OJUoh5BPPl1WUGJEl3G9WMj4taITLs'
        }
    })
    .then(function(response){
        // Log full response
        console.log(response);

        // Format response
        var formattedAddress = response.data.results[0].formatted_address;
        console.log(formattedAddress);
        var formattedAddressOutput = `
          <ul class="list-group">
            <li class="list-group-item">${formattedAddress}</li>
          </ul>
        `;

        // Address Components
        var addressComponents = response.data.results[0].address_components;
        console.log(addressComponents);
        var addressComponentsOutput = `<ul class="list-group">`;
        for(var i = 0;i < addressComponents.length;i++){
            addressComponentsOutput += `
              <li class="list-group-item"><strong>${addressComponents[i].types[0]}</strong>: ${addressComponents[i].long_name}</li>
            `
        }
        addressComponentsOutput += '</ul>';

        // Geometry
        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;
        var geometryOutput = `
          <ul class="list-group">
            <li class="list-group-item"><strong>Latitude</strong>: ${lat}</li>
            <li class="list-group-item"><strong>Longitude</strong>: ${lng}</li>
          </ul>
        `;

        // Output to app
        document.getElementById('formatted-address').innerHTML = formattedAddressOutput;
        document.getElementById('address-components').innerHTML = addressComponentsOutput;
        document.getElementById('geometry').innerHTML = geometryOutput;

        new google.maps.Marker({
            position: new google.maps.LatLng(lat,lng),
            map:map
        });

    })
    .catch(function(error){
        console.log(error);
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

    // Listen for click on map
    google.maps.event.addListener(map, 'click',
      function(event){
        // Add marker
        addMarker({coords:event.latLng});
    });

    // // New marker
    // var marker = new google.maps.Marker({
    //     position:{lat:37.7911281,lng:-122.401254},
    //     map:map,
    //     icon:'http://maps.google.com/mapfiles/ms/micons/purple-dot.png'
    // });
    //
    // var infoWindow = new google.maps.InfoWindow({
    //     content:'<h1>SF =)</h1>'
    // });
    //
    // marker.addListener('click', function(){
    //     infoWindow.open(map, marker);
    // });
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
