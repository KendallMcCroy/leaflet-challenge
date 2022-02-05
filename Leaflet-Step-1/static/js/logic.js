function createMap(earthquakes) {

    // Create the tile layer that will be the background of our map
    var quakes = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
    });

    // Create a baseMaps object to hold the earthquake map layer
    var baseMaps = {
        "Earthquake Map": quakes
    };

    // Create an overlayMaps object to hold the earthQuakes layer
    var overlayMaps = {
        "Earthquakes": earthquakes
    };
    // Create the map object with options
    var map = L.map("map-id", {
        center: [40.73, -94.0059],
        zoom: 4,
        layers: [quakes, earthquakes]

    });

    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);

}


function createMarkers(response) {

    console.log(response)

    var quakeData = response.features;
    var quakemakers = [];

    for (var index = 0; index < quakeData.length; index++) {
        var qData = quakeData[index];
        var coor = qData.geometry.coordinates
        var props = qData.properties


        // console.log(coor[0])
        var quakemaker = L.circle([coor[1], coor[0],]).bindPopup("<h3>" + props.title + "<h3><h3>Maginatude: " + props.mag + "</h3>");
            quakemakers.push(quakemaker);
        
            


    }

    createMap(L.layerGroup(quakemakers));
}

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);