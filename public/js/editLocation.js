console.log("testing edit location...");

var windowPath;
var windowPathSplit;
var id;
var url;

$(document).ready(function(){
    initMap();

    windowPath = window.location.pathname;
    windowPathSplit = windowPath.split('/');
    id = windowPathSplit[2];
    url = '/api/locations/' + id;

    // make a request to fetch the location
    $.ajax({
      method : "GET",
      url : url,
      success : onSuccess,
      error : onError
    });

});

function onSuccess(result){
  var output = `
    <form id="location-form">
      <input type="text" name="location" id="location-input" value="${result.address}" class="form-control form-control-lg">
      <br>
    </form>
    <button onclick="submitButton()" class="btn btn-primary btn-group btn-lg">submit</button>
  `;
  $("#formTarget").append(output);
  var lat = result.latitude;
  var lng = result.longitude;
  addMarker(lat,lng,map);
}

function submitButton(){
  $.ajax({
    method:"POST",
    url: '/api/newRequest',
    data: $("form").serialize(),
    success: newReqSuccess,
    error: onError
  });
}

function newReqSuccess(result){
  console.log(result.results[0].geometry.location.lat);
  console.log(result.results[0].geometry.location.lng);
  console.log(result.results[0].formatted_address);
  $("#formTarget").empty();
  var output = `
    <form id="location-form">
      <input type="text" name="address" id="address-input" value="${result.results[0].formatted_address}" class="form-control form-control-lg">
      <input type="hidden" name="latitude" id="latitude-input" value="${result.results[0].geometry.location.lat}" class="form-control form-control-lg">
      <input type="hidden" name="longitude" id="location-input" value="${result.results[0].geometry.location.lng}" class="form-control form-control-lg">
      <br>
    </form>
    <button onclick="cancelButton()" class="btn btn-danger btn-group btn-lg">cancel</button><button onclick="saveButton()" class="btn btn-success btn-group btn-lg">save</button>
  `;
  $("#formTarget").append(output);
  var lat = result.results[0].geometry.location.lat;
  var lng = result.results[0].geometry.location.lng;
  addMarker(lat,lng,map);
}

function cancelButton(){
  console.log("testing cancel button");
}

function saveButton(){
  console.log($("form").serialize());
  $.ajax({
    method: "PUT",
    url: url,
    data: $("form").serialize(),
    success: saveSuccess,
    error: onError
  })
}

function saveSuccess(result){
  console.log(result);
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
