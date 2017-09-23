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
        console.log(response);
    })
    .catch(function(error){
        console.log(error);
    });
}
