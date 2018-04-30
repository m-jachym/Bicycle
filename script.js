
function initMap() {
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: {lat: 37.77, lng: -122.447}
    });
    directionsDisplay.setMap(map);
  
    calculateAndDisplayRoute(directionsService, directionsDisplay);
    document.getElementById('mode').addEventListener('change', function() {
      calculateAndDisplayRoute(directionsService, directionsDisplay);
    });
  }
  
  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var selectedMode = document.getElementById('mode').value;
    directionsService.route({
      origin: {lat: 37.77, lng: -122.447},  // Haight.
      destination: {lat: 37.768, lng: -122.511},  // Ocean Beach.
      // Note that Javascript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: google.maps.TravelMode[selectedMode]
    }, function(response, status) {
      if (status == 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }


//   var map = new google.maps.Map(document.getElementById('map'),{
//     center:{
//         lat: 27.72,
//         lng: 85.36
//     },
//     zoom: 15
// });

// var marker = new google.maps.Marker({
//     position:(
//         lat: 27.72,
//         lng: 85.36
//     ),
//     map:map,
//     draggable:true
// })

// var searchBoxStart = new gogle.maps.places.SearchBox(document.getElementById('mapsearchStart'));
// var searchBoxEnd = new gogle.maps.places.SearchBox(document.getElementById('mapsearchEnd'));

// //place change event on search box
// google.maps.event.addListener(searchBox, 'places_change', function(){

//     var places = searchBox.getPlaces();

//     var bounds = new.gogle.maps.LatLngBounds();
//     var i, place:
//     for(i=0; place=places[i];i++){
//         console.log(place.geometry.location);

//         bounds.extend(place.geometry.location);
//         marker.serPosition(place.geometry.location);
//     }
//     map.fitBounds(bounds);
//     map.setZoom(15);

// });