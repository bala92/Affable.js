/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var map;
var index = 0;
var dict = {};
var score;
var imported = document.createElement('script');
imported.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDOWLpSeFnNSsjrsKqb0CQ6oNRsmFCUVqg&libraries=places&callback=initAutocomplete';
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


function getLatLong()
{

    var add = document.getElementById('autocomplete').value;
    add = "Yonge-Dundas Square, Dundas Street East, Toronto, ON, Canada";
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


}

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

function generate1() {
       console.log(dict);
      locationScore(dict);


}

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
                else
                {
                    console.log(query);
                    console.log(dist);
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
    var totalScore = (score["restaurant"]* 0.20) + (score["school"]* 0.30) + (score["hospital"]* 0.30) + (score["grocery"]*0.20);
    console.log("score is " + totalScore);
}

function getScore(dictObject,scoreFor)
{
    console.log();
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
    console.log("Score for " + scoreFor +  score[scoreFor]);

}
