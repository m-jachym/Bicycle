
var directionDisplay;
var directionDisplay2;
    
var map;
var map2;   


function initialize() {
    
    var krakow = new google.maps.LatLng(50.061,19.937);
    var myOptions = {
        zoom:12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: krakow
    }
    var myOptions2 = {
        zoom:12,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        center: krakow
    }

    directionsDisplay = new google.maps.DirectionsRenderer();
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    directionsDisplay.setMap(map);

    directionsDisplay2 = new google.maps.DirectionsRenderer();
    map2 = new google.maps.Map(document.getElementById("map_canvas2"), myOptions2);
    directionsDisplay2.setMap(map2);

    function podglad(x){
        var searchBox = new google.maps.places.SearchBox(x);
        map.addListener('bounds_changed', function() {
            searchBox.setBounds(map.getBounds());
        });
    }
    let start = document.getElementById('start');
    let end = document.getElementById('end');
    podglad(start);
    podglad(end);
}
    
var directionsService = new google.maps.DirectionsService();

function calcRoute() {
    var start = document.getElementById("start").value;
    var end = document.getElementById("end").value;
    var distanceInput = document.getElementById("distance");
    var time = document.getElementById("time");
    

    var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);           
            distanceInput.value = response.routes[0].legs[0].distance.value / 1000;
            time.value = response.routes[0].legs[0].duration.text;
        }
    });
}

let time2InNum;
function calcRoute2() {
    var start = document.getElementById("start").value;
    var end = document.getElementById("end").value;
    var distanceInput = document.getElementById("distance2");
    var time2 = document.getElementById("time2");
    var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.DirectionsTravelMode.BICYCLING
    };

    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            
            directionsDisplay2.setDirections(response);
            distanceInput.value = response.routes[0].legs[0].distance.value / 1000;
            time2.value = response.routes[0].legs[0].duration.text;
            time2InNum = response.routes[0].legs[0].duration.value;
        }
    });
}
// //////////////////////////////////

let calcBtn = document.querySelector("#calcBtn");
//tygodniowa oszczednosc paliwa
const pbPriceKm = 0.5;
let dist = document.querySelector("#distance");
let pbWeek = document.querySelector("#pbWeek");

calcBtn.addEventListener("click", function(){
    let countPbWeek = dist.value * pbPriceKm * 10;
    pbWeek.value = Math.ceil(countPbWeek);
});

//kalorie dziennie
const kcalmin = 10;
let kcalDay = document.querySelector("#kcalDay");

calcBtn.addEventListener("click", function(){
    let countKcalDay = ((time2InNum / 60)* kcalmin) * 2;
    kcalDay.value = Math.ceil(countKcalDay);
});


//emisja CO2 tygodniowa // CO2 180g/km
const co2Km = 180;
let co2Week = document.querySelector("#coDwa");

calcBtn.addEventListener("click", function(){
    let countCo2Week = dist.value * co2Km * 10;
  
    co2Week.value = Math.ceil(countCo2Week / 1000) + ' (kg)';
});













