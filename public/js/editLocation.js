console.log("testing edit location...");

$(document).ready(function(){
    var windowPath = window.location.pathname;
    var windowPathSplit = windowPath.split('/');
    var id = windowPathSplit[2];
    var url = '/api/locations/' + id;

    console.log(url);
    // use something like document.getElementById('location-input').value = ${formattedAddress};
    // so that the form is populated with the location's address
});
