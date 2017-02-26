#[Affable.js]

## Introduction- 

Affable.js is a JavaScript library that helps you in determining the livability score of a neighborhood. Affable.js Livability Score is designed to help you find the best places to live. You can find the score of a neighborhood using this api. 
It is created using a unique ranking algorithm that considers characteristics like -<br /><br />
1)	No of Hospitals around you. <br />
2)	No of School/Universities around you.<br />
3)	No of Restaurant around you.<br />4)	No of Airports around you.<br />
5)	Crime rate in the area.<br />

All these characteristics are giving a score from 100 based on the ranking algorithm. Livability score for the location is determined by the below equation – <br />

Final Score = HS * HF + SS * SF + RS * RF + AS * AF + CS * CF;<br />

Where, 
HS = Hospital Score, HF = Hospital Factor, SS = Schooling Score, SF = Schooling Factor, RS = Restaurant Score, RF = Restaurant Factor, AS = Airport Score, AF = Airport Factor, CS = Crime Score, CF = Crime Factor.<br/>

Each Factor is configurable and can be provided by the user as input.

Below are some of the cool features support by Affable.js library 
*	Provides easy access to library function for retrieving details of places like Restaurant, Hospitals, Airports, Schools, Crime Rate along with the rating for each of them. 
*	Provides integration with Google api and Amadeus api. 
*	Provides a distance function for calculating distance between two geocoordinates.


## USAGE

Below are the steps for using - <br/>1) Include ```html<script src="public_html/affable.js"" type="text/javascript">/"``` 2) There should be a div element -
```html
/"<div id="map" hidden="hidden">
</div>/"
```
<br/>
 3) Include below div tags for getting the search bar - <br/>


```html
<div style="width:800px; margin:0 auto;" id="form-container">
  <form class="form-inline mt-2 mt-md-0"><input class="form-control mr-sm-2 expand" type="text" id="autocomplete" placeholder="Enter your address" onblur="getLatLong()" style="width:500px;">
        <input class="btn btn-success my-2 my-sm-0" type="button" id="generate" onclick="generate1()" value="Search"></form>
</div>
```
<br/>

4) Refer Index.html for example client usage.<br/>

[USAGE EXAMPLE] ---------------------------------------------------<br/>

Api provides below function for usage -<br/>

* function getDictionaryObject() Explanation - Return the DictObject Object eg: {"restaurant" : [{name: "Jimmy Jones" , rating: 4.3} , {name: "Panera Bread" , rating: 4.1}], "school" : [{name: "Middle High School" , rating: 4.3} , {name: "West Devon School" , rating: 4.1}], "hospital" : [{name: "UIHC" , rating: 4.6} , {name: "Health Care" , rating: 4.1}] "grocery" : [{name: "Walmart" , rating: 4.3} , {name: "Bread Garden" , rating: 4.1}]

* function getScore(dictObject,scoreFor) - Explanation - Return the score for the map key word. eg: getScore(dict , "restaurant"); return score for restaurant category.

* function distance(lat1, lon1, lat2, lon2) - Explanation - This funtion takes in Two cordinate point and return distance between them in Miles.

BUILD/INSTALLATION INSTRUCTIONS -------------------------<br/>

Include the Js file in the application for usage.<br/>



OTHER SOURCES OF DOCUMENTATION ------------------------<br/>
[Named Link]https://developers.google.com/places/web-service/search
[Named Link]https://sandbox.amadeus.com/travel-innovation-sandbox/apis/get/airports/nearest-relevant


Contributor Guide [LINK TO CONTRIBUTING.md]<br/>



License :<br/>
Team selected to use MIT License to Open source.<br/>
