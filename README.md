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
