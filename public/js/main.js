geocode();

function geocode(){
    var location = '222 Bush Street San Fracisco CA';

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
        console.log(response.data.results[0].formatted_address);
        var formattedAddress = response.data.results[0].formatted_address;
        var formattedAddressOutput = `
          <ul class="list-group">
            <li class="list-group-item">${formattedAddress}</li>
          </ul>
        `;

        // Output to app
        document.getElementById('formatted-address').innerHTML = formattedAddressOutput;
    })
    .catch(function(error){
        console.log(error);
    });
}
