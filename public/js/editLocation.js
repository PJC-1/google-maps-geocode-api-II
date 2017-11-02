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
  var output = `
    <form id="location-form">
      <input type="text" name="location" id="location-input" value="${result.address}" class="form-control form-control-lg">
      <br>
      <input type="submit" name="singlebutton" class="btn btn-primary btn-block" value="SUBMIT">
    </form>
  `;
  $("#formTarget").append(output);
}

function onError(err){
  console.log(err);
}
