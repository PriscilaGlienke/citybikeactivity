let url = 'https://gbfs.citibikenyc.com/gbfs/en/station_information.json'
let newYorkCoords = [40.73, -74.0059];
let mapZoomLevel = 12;

// Create the createMap function.
function createMap(bikeStation) {

  // Create the tile layer that will be the background of our map.
  let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  // Create a baseMaps object to hold the streetmap layer.
  let baseMaps = {
    "Street Map": streetmap
  };

  // Create an overlayMaps object to hold the bikeStations layer.
  let overlatMaps = {
    "Bike Stations": bikeStations
  };

  // Create the map object with options.
  let map = L.map("map-id", {
    center: newYorkCoords,
    zoom: mapZoomLevel,
    layers: [streetmap, bikeStations]
  });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}


// Create the createMarkers function.
function createMarkers (response) {
  // Pull the "stations" property from response.data.
  let stations = response.data.stations;
  // Initialize an array to hold the bike markers.
  var bikeMarkers = [];
  // Loop through the stations array.
  for (let index = 0; index < stations.length; index++) {
    var station = stations[index];
    // For each station, create a marker, and bind a popup with the station's name.
    var bikeMarker = L.marker([station.lat, station.long]).bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>");
    // Add the marker to the bikeMarkers array.
    bikeMarker.push(bikeMarker);
  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
    createMap(L.layerGroup(bikeMarker))
    
  }
}
// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json(url).then(createMarkers)


/////////////////////////////////////////////////////////////////////////////////////
//CLASS

// let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// });

// let baseMaps = {
//   "Street Map" : street
// }

// let url = 'https://gbfs.citibikenyc.com/gbfs/en/station_information.json'

// d3.json(url).then((response) => {
//   // console.log(response)
//   let newYorkCoords = [40.73, -74.0059];
//   let mapZoomLevel = 12;


//   let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//   });

//   let baseMaps = {
//   "Street Map" : street
// }

//   let stations = response.data.stations
  
//   let bikeMarkers = []
//   // console.log(stations)

//   for (let i = 0; i < stations.length; i++) {
//     let station = stations[i]
//     let bikeCoords = [station.lat, station.lon]
//     let bikeMarker = L.marker(bikeCoords).bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>")
//     // console.log(bikeCoords)
//     bikeMarkers.push(bikeMarker)
//   }

//   let bicycleStations = L.layerGroup(bikeMarkers)
  
//   let overlayMaps = {
//     "Bicycle Stations" : bicycleStations
//  }
// //  console.log(bicycleStations)
 
//  let myMap = L.map("map-id", {
//    center: newYorkCoords,
//    zoom: mapZoomLevel,
//    layers: [street, bicycleStations]
//  })
 
//  L.control.layers(baseMaps, overlayMaps, {
//    collapsed: false
//  }).addTo(myMap)

// })
