/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var map;
var infowindow;

var imported = document.createElement('script');
imported.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDSS2NJh-rl5-KWzRX4ypoi84Shvw6tUZE&libraries=places&callback=initAutocomplete';
document.head.appendChild(imported);

//var geolocate = document.getElementById("autocomplete");
//var geolocateAtt = document.createAttribute("onFocus");
//geolocateAtt.value = "geolocate()";
//geolocate.setAttributeNode(geolocateAtt);

function initAutocomplete() {
    
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
            {types: ['geocode']});

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
}
function fillInAddress() {
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.

function getLatLong()
  {
    var add = document.getElementById('autocomplete').value;
    var geo = new google.maps.Geocoder;
    geo.geocode({'address':add},function(results, status){
      if (status == google.maps.GeocoderStatus.OK) {
        var myLatLng = results[0].geometry.location;
        var myLat = results[0].geometry.location.lat();
        var myLng = results[0].geometry.location.lng();
        initMap(myLat, myLng);

      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
}
//function geolocate() {
//    if (navigator.geolocation) {
//        navigator.geolocation.getCurrentPosition(function (position) {
//            var geolocation = {
//                lat: position.coords.latitude,
//                lng: position.coords.longitude
//            };
//            var circle = new google.maps.Circle({
//                center: geolocation,
//                radius: position.coords.accuracy
//            });
//            autocomplete.setBounds(circle.getBounds());
//            initMap(geolocation.lat, geolocation.lng);
//        });
//    }
//}
//


function initMap(lat, lng) {
    var pyrmont = {lat: lat, lng: lng};

    map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 15
    });

    var request = {
        location: pyrmont,
        radius: '500',
        query: 'restaurant'
    };
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
             createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    alert(place.name)
}