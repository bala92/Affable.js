#[Affable.js]
Introduction-

Affable.js is a JavaScript library that helps you in determining the livability score of a neighborhood. Affable.js Livability Score is designed to help you find the best places to live. You can find the score of a neighborhood using this api.
It is created using a unique ranking algorithm that considers characteristics like -
1)	No of Hospitals around you.
2)	No of School/Universities around you.
3)	No of Restaurant around you.4)	No of Airports around you.
5)	Crime rate in the area.

All these characteristics are giving a score from 100 based on the ranking algorithm. Livability score for the location is determined by the below equation –

Final Score = HS * HF + SS * SF + RS * RF + AS * AF + CS * CF;

Where,
HS = Hospital Score, HF = Hospital Factor, SS = Schooling Score, SF = Schooling Factor, RS = Restaurant Score, RF = Restaurant Factor, AS = Airport Score, AF = Airport Factor, CS = Crime Score, CF = Crime Factor.

Each Factor is configurable and can be provided by the user as input.

Below are some of the cool features support by Affable.js library
•	Provides easy access to library function for retrieving details of places like Restaurant, Hospitals, Airports, Schools, Crime Rate along with the rating for each of them.
•	Provides integration with Google api and Amadeus api.
•	Provides a distance function for calculating distance between two geocoordinates.



USAGE
Below are the steps for using -
1) Include <script src="public_html/affable.js" type="text/javascript"></script>
2) There should be a div element - <div id="map" hidden="hidden"></div>
3) Include below div tags for getting the search bar -

<div style="width:800px; margin:0 auto;" id="form-container">
    <form class="form-inline mt-2 mt-md-0">
        <input class="form-control mr-sm-2 expand" type="text" id="autocomplete" placeholder="Enter your address" onblur="getLatLong()" style="width:500px;">
        <input class="btn btn-success my-2 my-sm-0" type="button" id="generate" class="generate" onclick="generate1()" value ="Search"/>
    </form>
</div>

4) Copy Below code to get the framework for displaying the indiviual score and Livelihood score.

<div class="card-deck container">
<div class="card">
  <h4 class="card-title" style=" text-align:center" >School</h4>

  <div class="card-block">
      <p class="card-text" style="font-size:60pt; text-align:center" id="schoolScore">0</p>
      <hr/>
      <p class="card-text" style="font-size:20pt; text-align:center" id="schoolValue">0</p>
  </div>
  <div>
<div >
<div >
      <button type="button" class="btn btn-default btn-sm bt btn-success" id="upschool" onclick="upclick(this.id)">
  <span class="glyphicon glyphicon-arrow-up"></span> Up
</button>
</div>
<div >
      <button type="button" class="btn btn-default btn-sm bt btn-danger" id="downschool" onclick="downclick(this.id)">
  <span class="glyphicon glyphicon-arrow-up"></span> down
</button>
</div>
  </div>
</div>

</div>

<div style="width:800px; margin:0 auto; font-size:20pt; text-align:center" id="res">
</div>

  <div class="card">
    <h4 class="card-title" style=" text-align:center" >Restaurant</h4>

      <div class="card-block">
          <p class="card-text" style="font-size:60pt; text-align:center" id="restaurantScore">0</p>
          <hr/>
          <p class="card-text" style="font-size:20pt; text-align:center" id="restaurantValue">0</p>
      </div>
      <div>
          <button type="button" class="btn btn-default btn-sm bt btn-success" id="uprestaurant" onclick="upclick(this.id)">
  <span class="glyphicon glyphicon-arrow-up"></span> Up
</button>
          <button type="button" class="btn btn-default btn-sm bt btn-danger" id="downrestaurant" onclick="downclick(this.id)">
  <span class="glyphicon glyphicon-arrow-up"></span> down
</button>
      </div>

  </div>
  <div class="card">
    <h4 class="card-title" style=" text-align:center" >Grocery</h4>

      <div class="card-block">
          <p class="card-text" style="font-size:60pt; text-align:center" id="groceryScore">0</p>
          <hr/>
          <p class="card-text" style="font-size:20pt; text-align:center" id="groceryValue">0</p>
      </div>
      <div>
          <button type="button" class="btn btn-default btn-sm bt btn-success" id="upgrocery" onclick="upclick(this.id)">
  <span class="glyphicon glyphicon-arrow-up"></span> Up
</button>
          <button type="button" class="btn btn-default btn-sm bt btn-danger" id="downgrocery" onclick="downclick(this.id)">
  <span class="glyphicon glyphicon-arrow-up"></span> down
</button>
      </div>

  </div>
  <div class="card">
    <h4 class="card-title" style=" text-align:center" >Hospital</h4>

      <div class="card-block">
          <p class="card-text" style="font-size:60pt; text-align:center" id="hospitalScore">0</p>
          <hr/>
          <p class="card-text" style="font-size:20pt; text-align:center" id="hospitalValue">0</p>
      </div>
      <div>
          <button type="button" class="btn btn-default btn-sm bt btn-success" id="uphospital" onclick="upclick(this.id)">
  <span class="glyphicon glyphicon-arrow-up"></span> Up
</button>
          <button type="button" class="btn btn-default btn-sm bt btn-danger" id="downhospital" onclick="downclick(this.id)">
  <span class="glyphicon glyphicon-arrow-up"></span> down
</button>
      </div>

  </div>
  <div class="card">
    <h4 class="card-title" style=" text-align:center" >Crime</h4>

      <div class="card-block">
          <p class="card-text" style="font-size:60pt; text-align:center" id="crimeScore">0</p>
          <hr/>
          <p class="card-text" style="font-size:20pt; text-align:center" id="crimeValue">0</p>
      </div>
      <div>
          <button type="button" class="btn btn-default btn-sm bt btn-success" id="upcrime" onclick="upclick(this.id)">
  <span class="glyphicon glyphicon-arrow-up"></span> Up
</button>
          <button type="button" class="btn btn-default btn-sm bt btn-danger" id="downcrime" onclick="downclick(this.id)">
  <span class="glyphicon glyphicon-arrow-up"></span> down
</button>
      </div>

  </div>
  <div class="card">
    <h4 class="card-title" style=" text-align:center" >Airport</h4>

      <div class="card-block">
          <p class="card-text" style="font-size:60pt; text-align:center" id="airportScore">0</p>
          <hr/>
          <p class="card-text" style="font-size:20pt; text-align:center" id="airportValue">0</p>
      </div>
      <div>
          <button type="button" class="btn btn-default btn-sm bt btn-success" id="upairport" onclick="upclick(this.id)">
  <span class="glyphicon glyphicon-arrow-up"></span> Up
</button>
          <button type="button" class="btn btn-default btn-sm bt btn-danger" id="downairport" onclick="downclick(this.id)">
  <span class="glyphicon glyphicon-arrow-up"></span> down
</button>
      </div>

  </div>


•	[USAGE EXAMPLE]
BUILD/INSTALLATION INSTRUCTIONS
•	[PLATFORM 1]
o	[BUILD EXAMPLE]
•	[PLATFORM 2]
o	[BUILD EXAMPLE]
[INTERFACES] (if applicable)
OTHER SOURCES OF DOCUMENTATION
Contributor Guide
[LINK TO CONTRIBUTING.md]
License
