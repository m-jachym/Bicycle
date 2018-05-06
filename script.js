
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
let timeInNumCar;
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
            timeInNumCar = response.routes[0].legs[0].duration.value;
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
calcBtn.addEventListener("click", countDifferenceDaily(1, calcBtn));
let calcBtnWeek = document.querySelector("#calcBtnWeek");
calcBtnWeek.addEventListener("click", countDifferenceDaily(5, calcBtnWeek));
let calcBtnMonth = document.querySelector("#calcBtnMonth");
calcBtnMonth.addEventListener("click", countDifferenceDaily(20, calcBtnMonth));
let calcBtnYear = document.querySelector("#calcBtnYear");
calcBtnYear.addEventListener("click", countDifferenceDaily(251, calcBtnYear));

function countDifferenceDaily(days, daysbtn) {
    
    //paliwo
    const pbPriceKm = 0.5;
    let dist = document.querySelector("#distance");
    let pbCar = document.querySelector("#pbCar");
    daysbtn.addEventListener("click", function(){
        let countPbCar = dist.value * pbPriceKm * 2 * days;
        pbCar.value = Math.ceil(countPbCar);
        document.querySelector("#pbBike").value = 0;
    });

    //emisja CO2  // CO2 180g/km
    const co2Km = 160;
    let co2Day = document.querySelector("#coDwa");

    daysbtn.addEventListener("click", function(){
        let countCo2Day = dist.value * co2Km * 2 * days;
        co2Day.value = Math.ceil(countCo2Day) + ' (gram)';
        document.querySelector("#coDwaBike").value = 0;
    });

    //kalorie 
    const kcalmin = 10;
    let kcalBike = document.querySelector("#kcalBike");
    const kcalminCar = 1.3;
    let kcalCar = document.querySelector("#kcalCar");
    daysbtn.addEventListener("click", function(){
        let countKcalBike = ((time2InNum / 60)* kcalmin) * 2 * days;
        kcalBike.value = Math.ceil(countKcalBike);
        let countKcalCar = ((timeInNumCar / 60)* kcalminCar)* 2 * days;
        kcalCar.value = Math.floor(countKcalCar);
    });

}












