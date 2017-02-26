/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var map;
var index = 0;
var dict = {};
var score;
var airportScore = 0;
var imported = document.createElement('script');
imported.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCG1ehul1kZTGUDnXh0kI1-pxr_fJ-OKw8&libraries=places&callback=initAutocomplete';
document.head.appendChild(imported);



// This function is called everytime when autocomplete search is done in textbox.
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

// This function should be called onBlur() event of the searchTextBox.
function getLatLong()
{

    var add = document.getElementById('autocomplete').value;
    // add = "Yonge-Dundas Square, Dundas Street East, Toronto, ON, Canada";
    var geo = new google.maps.Geocoder;
    geo.geocode({'address': add}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var myLat = results[0].geometry.location.lat();
            var myLng = results[0].geometry.location.lng();
            initMap(myLat, myLng, 500, 'restaurant');
            initMap(myLat, myLng, 500, 'elementary school or high school');
            initMap(myLat, myLng, 500, 'hospital');
            initMap(myLat, myLng, 500, 'grocery store');
            airportScore =  getAirports(myLat , myLng);


            index =0;
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });


}
// This funtion takes in Two cordinate point and return distance between them in Miles.
function distance(lat1, lon1, lat2, lon2) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    return dist
}

// This function is called when the search button in query box is pressed.
function generate1() {
       console.log(dict);
      locationScore(dict);


}

/*This function is required for calling Places api for google maps
//with different query parameters.
Input Parameters: lat : latitude of the searched places
                  lng : longitude of the searched places
                  radius: Radius priority
                  query: Search Term */

function initMap(lat, lng, radius, query) {
    console.log("Inside Init Map");
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
    service.textSearch(request, function callback(results , status)
    {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            var myList = [];
            for (var i = 0; i < results.length; i++) {
                var latitude = results[i].geometry.location.lat();
                var longitude = results[i].geometry.location.lng();
                var dist = distance(lat,lng , latitude , longitude)
                if (dist < 1)
                {
                    var myObject = {name: results[i].name, rating: results[i].rating};
                    myList.push(myObject);
                }

            }
            if(query == "restaurant"){indexName = "restaurant";}
            else if(query == "elementary school or high school"){indexName = "school";}
            else if(query == "hospital"){indexName = "hospital";}
            else if(query == "grocery store"){indexName = "grocery";}
            dict[indexName] = myList;
        }
    });

}


function locationScore(dictObject) {

    score = new Object();
    getScore(dictObject,"restaurant");
    getScore(dictObject,"school");
    getScore(dictObject,"hospital");
    getScore(dictObject, "grocery");
    var totalScore = 0;
    if(document.getElementById("restaurantValue").innerHTML == 0
    && document.getElementById("schoolValue").innerHTML == 0
    && document.getElementById("hospitalValue").innerHTML == 0
    && document.getElementById("groceryValue").innerHTML == 0
    && document.getElementById("crimeValue").innerHTML == 0
    && document.getElementById("airportValue").innerHTML == 0) {
        totalScore = (score["restaurant"] * 0.20) + (score["school"] * 0.20) + (score["hospital"] * 0.20) + (score["grocery"] * 0.20) + (airportScore * 0.20);
    }
    else {
        totalScore = (score["restaurant"] * parseInt(document.getElementById("restaurantValue").innerHTML)*0.01) +
            (score["school"] * parseInt(document.getElementById("schoolValue").innerHTML)*0.01) +
            (score["hospital"] * parseInt(document.getElementById("hospitalValue").innerHTML)*0.01) +
            (score["grocery"] * parseInt(document.getElementById("groceryValue").innerHTML)*0.01) +
            (airportScore * parseInt(document.getElementById("airportValue").innerHTML)*0.01);
    }

    console.log("score for Airport " + airportScore);
    document.getElementById("restaurantScore").innerHTML = parseInt(score["restaurant"]);
    document.getElementById("schoolScore").innerHTML = parseInt(score["school"]);
    document.getElementById("hospitalScore").innerHTML = parseInt(score["hospital"]);
    document.getElementById("groceryScore").innerHTML = parseInt(score["grocery"]);
    document.getElementById("airportScore").innerHTML = parseInt(airportScore);
    document.getElementById("res").innerHTML = "Overall livability Score: " + parseInt(totalScore);
    console.log("Final Score" + totalScore);
}
/* Return the Dict Object
//eg: {"restaurant" : [{name: "Jimmy Jones" , rating: 4.3} , {name: "Panera Bread" , rating: 4.1}],
       "school" : [{name: "Middle High School" , rating: 4.3} , {name: "West Devon School" , rating: 4.1}],
       "hospital" : [{name: "UIHC" , rating: 4.6} , {name: "Health Care" , rating: 4.1}]
       "grocery" : [{name: "Walmart" , rating: 4.3} , {name: "Bread Garden" , rating: 4.1}]*/
function getDictionaryObject()
{
  try {
    return dict;
  } catch (e) {
    console.log("dictionary is empty");
  } finally {

  }

}

/* Return the score for the map key word.
//eg: getScore(dict , "restaurant"); return score for restaurant category.
*/
function getScore(dictObject,scoreFor)
{
    var result = 0;
    var total = dictObject[scoreFor].length;
    var myarr = dictObject[scoreFor];
    var sum = 0;
    for (var i = 0; i < total; i++) {
        if(myarr[i].rating != null)
       sum = sum + myarr[i].rating;
    }
    var avg = 0;
    if(total != 0)
      avg = sum/ total ;

   if(scoreFor == "restaurant")
   {
       console.log("Value for Avg" + avg);
       score[scoreFor] = (((total / 20 )* 0.6) + (((avg/(5)) * 0.4))) * 100 ;
   }
    else if(scoreFor == "school")
    {
        if(total > 5)
            total = 5;
        score[scoreFor] = (((total / 5 )* 0.6) + (((avg/(5)) * 0.4))) * 100 ;
    }
    else if(scoreFor == "hospital")
    {
        if(total > 5)
            total = 5;
        score[scoreFor] = (((total / 5 )* 0.6) + (((avg/(5)) * 0.4))) * 100;
    }
    else if(scoreFor == "grocery")
    {
        if(total > 5)
            total = 5;
        score[scoreFor] = (((total / 5 )* 0.6) + (((avg/(5)) * 0.4))) * 100  ;
    }
    result = score[scoreFor];
    return result;
    console.log("Score for " + scoreFor +  score[scoreFor]);

}

//Return the score of Airport Category for the Lat and longitude of location passed by the user.
function getAirports(myLat , myLng)
{

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://api.sandbox.amadeus.com/v1.2/airports/nearest-relevant?latitude="+myLat+"&longitude="+myLng+"&apikey=2oxAh56O3TrgZdG50AS8Ftkv2b9sGAT7", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
    var score = 0;
    var distance = response[0].distance;
    if(distance < 10)
        score = 100;
    else if(distance <20)
        score = 90;
    else if(distance < 40)
        score = 80;
    else if(distance < 80)
        score = 60;
    else
        score = 40;

    return score;

}
