// alert("Hallo Welt")

const div = document.getElementById("map");
const breite = div.getAttribute("data-lat");
const laenge = div.getAttribute("data-lng");
const titel = div.getAttribute("data-title");


// console.log("Breite =",breite,"Länge =",laenge,"Titel =",titel)

// Karte initialisieren
let karte = L.map("map");
// console.log(karte);

//Karten einbauen
const kartenLayer = {
    osm: L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    stamen_toner: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Datenquelle: Map tiles by <a href="http://stamen.com">, under CC BY 3.0. Data by OpenStreetMap, under ODbL.</a>'
    }),
    stamen_terrain: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Datenquelle: Map tiles by <a href="http://stamen.com">, under CC BY 3.0. Data by OpenStreetMap, under ODbL.</a>'
    }),
    stamen_watercolor: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Datenquelle:  Map tiles by <a href="http://stamen.com">, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.</a>'
    }),
    nz_topo50: L.tileLayer("http://tiles-a.data-cdn.linz.govt.nz/services;key=YOUR_API_TOKEN/tiles/v4/layer=50767/EPSG:3857/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Datenquelle:  Map tiles by <a href="https://data.linz.govt.nz/services/csw/?service=CSW&amp;request=GetCapabilities">, under CC BY SA.</a>'
    }),
    nz_Aerial: L.tileLayer("http://tiles-a.data-cdn.linz.govt.nz/services;key=61f4f788d982486eb3bbc564cf1a8808/tiles/v4/set=4702/EPSG:3857/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Datenquelle:  Map tiles by <a href="https://data.linz.govt.nz/services/csw/?service=CSW&amp;request=GetCapabilities">, under CC BY SA.</a>'
    })
};

// Open Streetmap einbauen



kartenLayer.stamen_terrain.addTo(karte);

//Auswahlmenü hinzufügen
L.control.layers({
    "OpenStreetMap": kartenLayer.osm,
    "Stamen Maps Toner": kartenLayer.stamen_toner,
    "Stamen Maps Terrain": kartenLayer.stamen_terrain,
    "Stamen Maps Watercolor": kartenLayer.stamen_watercolor,
    "NZ Topo 50": kartenLayer.nz_topo50,
    "NZ Aerial Imagery": kartenLayer.nz_Aerial
}).addTo(karte);


// auf Ausschnitt zoomen
karte.setView(
    [breite,laenge],
    13
);

// Open Streetmap einbauen
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(karte);

// Positionsmarker hinzufügen
let pin=L.marker(
   [breite,laenge]
).addTo(karte);


// Popup zum Pin hängen
pin.bindPopup(titel).openPopup();

karte.addControl(new L.Control.Fullscreen()); // Fullscreen Plugin
var hash = new L.Hash(karte); //Koordinaten anzeigen im Link

var coords = new L.Control.Coordinates(); //Koordinaten durch Klick anzeigen
coords.addTo(karte);
karte.on('click', function (e) {
    coords.setCoordinates(e);
});