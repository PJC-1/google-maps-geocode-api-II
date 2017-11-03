console.log("testing edit location...");

$(document).ready(function(){
    initMap();

    var windowPath = window.location.pathname;
    var windowPathSplit = windowPath.split('/');
    var id = windowPathSplit[2];
    var url = '/api/locations/' + id;

    console.log(url);

    // make a request to fetch the location
    $.ajax({
      method : "GET",
      url : url,
      success : onSuccess,
      error : onError
    });

    // make a Get request to Geocode API on 'submit', then
    // on success make two buttons: 1. save changes 2. cancel changes
});

function onSuccess(result){
  console.log(result);
  var output = `
    <form id="location-form">
      <input type="text" name="location" id="location-input" value="${result.address}" class="form-control form-control-lg">
      <br>
    </form>
    <button onclick="submitButton()" class="btn btn-primary btn-block">submit</button>
  `;
  $("#formTarget").append(output);
  var lat = result.latitude;
  var lng = result.longitude;
  addMarker(lat,lng,map);
}

function submitButton(){
  console.log("testing button");
  console.log($("form").serialize());
}

function onError(err){
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
