/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var map;
var index = 0;
var dict = {};

var imported = document.createElement('script');
imported.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBLK50uGqoY2xNWWHGzq_CPAGZt08OGax0&libraries=places&callback=initAutocomplete';
document.head.appendChild(imported);




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

// When the user selects a city, get the place details for the city and
      // zoom the map in on the city.
      // function onPlaceChanged() {
      //   var place = autocomplete.getPlace();
      //   if (place.geometry) {
      //     map.panTo(place.geometry.location);
      //     map.setZoom(15);
      //     search();
      //   } else {
      //     document.getElementById('autocomplete').placeholder = 'Enter a city';
      //   }
      // }

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.

©©©©
function getLatLong()
{

    var add = document.getElementById('autocomplete').value;
    add = "1100 Oakcrest Street, Iowa City, IA";
    var geo = new google.maps.Geocoder;
    geo.geocode({'address': add}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var myLat = results[0].geometry.location.lat();
            var myLng = results[0].geometry.location.lng();
            initMap(myLat, myLng, 500, 'restaurant');
            initMap(myLat, myLng, 500, 'elementary school or high school');
            initMap(myLat, myLng, 500, 'hospital');
            initMap(myLat, myLng, 500, 'grocery store');
            index =0;
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
//    for (var i = 0; i < restaurant.length; i++) {
//        document.write(restaurant[i].name);
//        alert();
//    }

}

function generate()
{
    alert(Object.keys(dict).length);
    try {
//        for (var j = 0; j < Object.keys(dict).length; j++)
//        {
//            for (var i = 0; i < Object.keys(dict)[j].length; i++)
//            {
//                document.write(Object.keys(dict)[j][i].name);
////        alert();
//            }
//            document.write("<br/><br/><br/>");
//        }
    }
    catch (err)
    {
        alert();
    }

}

function initMap(lat, lng, radius, query) {
    var pyrmont = {lat: lat, lng: lng};

    map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 15
    });

    var request = {
        location: pyrmont,
        radius: radius,
        query: query
    };
    var service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);

}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        var myList = [];
        for (var i = 0; i < results.length; i++) {
            var myObject = {name: results[i].name, rating: results[i].rating};
            myList.push(myObject);
        }
        var indexName;
        if(index == 0){indexName = "restaurant";}
        else if(index == 1){indexName = "school";}
        else if(index == 2){indexName = "hospital";}
        else if(index == 3){indexName = "grocery";}
        dict[indexName] = myList;
        index++;
    }
}

// function createMarker(place) {
//     alert(place.name)
// }

var score;

function locationScore(location) {
var numberOfRestaurants = location["restaurant"].length;
var numberOfHospital = location["hospital"].length;
var numberOfUniversity = location["university"].length;
var numberOfSchools = location["university"].length;
var numberOfGrocery = location["university"].length;
score = new Object();
appendScore(numberOfRestaurants,"restaurant");
appendScore(numberOfHospital,"hospital");
appendScore(numberOfUniversity,"university");
appendScore(numberOfSchools, "school");
appendScore(numberOfGrocery, "grocery");

var totalScore = score["restaurant"]+score["hospital"]+score["university"]+score["school"]+score["grocery"];
totalScore = (totalScore * 100)/75;
}

function appendScore(number,scoreFor)
{
  if (number<5)
  score[scoreFor] = 5;
  else if (number > 5 && number < 10)
  score[scoreFor] = 10;
  else {
  score[scoreFor] = 15;
  }



}
