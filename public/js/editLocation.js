console.log("testing edit location...");

$(document).ready(function(){
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

    // use something like document.getElementById('location-input').value = ${formattedAddress};
    // so that the form is populated with the location's address
    // document.getElementById('location-input').value =
});

function onSuccess(result){
  console.log(result);
}

function onError(err){
  console.log(err);
}
