// alert("Hallo Welt")

const div = document.getElementById("map");
const breite = div.getAttribute("data-lat");
const laenge = div.getAttribute("data-lng");
const titel = div.getAttribute("data-title");

// 2. Punkt

const breite2 = div.getAttribute("data-lat2");
const laenge2 = div.getAttribute("data-lng2");
const titel2 = div.getAttribute("data-title2");



// console.log("Breite =",breite,"Länge =",laenge,"Titel =",titel)

// Karte initialisieren
let karte = L.map("map");
// console.log(karte);

// auf Ausschnitt zoomen
// karte.setView(
//     [47.2, 11.2],
//     8
// );
//Karten einbauen
const kartenLayer = {
    osm: L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at"> basemap.at</a>'
    }),
    bmapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at"> basemap.at</a>'
    }),
    bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at"> basemap.at</a>'
    }),
    bmaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at"> basemap.at</a>'
    }),
    bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at"> basemap.at</a>'
    }),
    bmapgelaende: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at"> basemap.at</a>'
    }),
    bmapoberflaeche: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at"> basemap.at</a>'
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
    })
};

// Open Streetmap einbauen



kartenLayer.geolandbasemap.addTo(karte);

//Auswahlmenü hinzufügen
L.control.layers({
    "OpenStreetMap": kartenLayer.osm,
    "Geoland Basecamp": kartenLayer.geolandbasemap,
    "Geoland Basemap Overlay": kartenLayer.bmapgrau,
    "Geoland Basemap Grau": kartenLayer.bmapoverlay,
    "Geoland Basemap hidpi": kartenLayer.bmaphidpi,
    "Geoland Basemap Foto": kartenLayer.bmaporthofoto30cm,
    "Geoland Basemap Gelände": kartenLayer.bmapgelaende,
    "Geoland Basemap Fläche": kartenLayer.bmapoberflaeche,
    "Stamen Maps Toner": kartenLayer.stamen_toner,
    "Stamen Maps Terrain": kartenLayer.stamen_terrain,
    "Stamen Maps Watercolor": kartenLayer.stamen_watercolor
}).addTo(karte);

// Fernrohre
let blickeGruppe = L.featureGroup().addTo(karte);
// Positionsmarker hinzufügen
let pin = L.marker(
    [breite, laenge]
).addTo(karte);

// Popup zum Pin hängen
pin.bindPopup(titel);



//2. Punkt
let pin2 = L.marker(
    [breite2, laenge2]
).addTo(blickeGruppe);
pin2.bindPopup(titel2);




//for Schleife pin erstellen
for (let blick of ADLERBLICKE) {
    let blickpin = L.marker(
        [blick.lat, blick.lng]
    ).addTo(blickeGruppe);
    blickpin.bindPopup(
        `<h1>Standort ${blick.standort}</h1>
            <p>Höhe: ${blick.seehoehe} m </p>
            <em>Kunde: ${blick.kunde}</em>`
    );
}
//console.log(blickeGruppe.getBounds());
// Auf Adlerblicke zoomen
karte.fitBounds(blickeGruppe.getBounds());
karte.addControl(new L.Control.Fullscreen()); // Fullscreen Plugin
var hash = new L.Hash(karte); //Koordinaten anzeigen im Link

var coords = new L.Control.Coordinates(); //Koordinaten durch Klick anzeigen
coords.addTo(karte);
karte.on('click', function (e) {
    coords.setCoordinates(e);
});

//gpx track laden
new L.GPX("AdlerwegEtappeO9.gpx", {
    async: true,
    marker_options: {
        startIconUrl: 'images/pin-icon-start.png',
        endIconUrl: 'images/pin-icon-end.png',
        shadowUrl: 'images/pin-shadow.png'
    }
}).on('loaded', function (e) {
    karte.fitBounds(e.target.getBounds());
    const statsDiv = document.getElementById("stats"); //Routeninformationen aus dem Index öffnen
    
    const verticalMeters = Math.round(e.target.get_elevation_gain());//Höhenmeter
    const minHeight = Math.round(e.target.get_elevation_min());
    const maxHeight = Math.round(e.target.get_elevation_max());
    const name = e.target.get_name();
    statsDiv.innerHTML = `Routen Statistik: <br> Name: ${name}, Höhenunterschied ${verticalMeters} m, niedrigster Punkt ${minHeight} m, höchster Punkt ${maxHeight} m
    `; //Routeninformationen einsetzen

}).on('addline', function (e) { //Höhenprofil hinzufügen
    console.log('linie geladen');
    const controlElevation = L.control.elevation({
        detachedView: true, //if false the chart is drawn within map container
        elevationDiv: "#elevation-div", // if (detached), the elevation chart container
    });
    controlElevation.addTo(karte); //Daten einfügen (Höhenlinie)
    controlElevation.addData(e.line);
    const gpxLinie = e.line.getLatLngs(); //steile Abschnitte kennzeichnen
    //console.log(gpxLinie);
    for (let i = 1; i < gpxLinie.length; i += 1) {
        //console.log(gpxLinie[i]);
        let p1 = gpxLinie[i - 1];
        let p2 = gpxLinie[i];
        let dist = karte.distance(
            [p1.lat, p1.lng],
            [p2.lat, p2.lng],
        );
        let delta = (p2.meta.ele - p1.meta.ele); //Höhenunterschied ausrechnen
        let proz = (dist != 0 ? delta / dist * 100.0 : 0).toFixed(1); //Prozentzahl berechnen;   toFixed(1)=auf eine Kommastelle gerundet
        //console.log('Distanz: ', dist, 'Höhendiff.: ', delta, 'Steigung: ', proz);
        let farbe = //Colorrewer2.org
            proz >= 10 ? "#d73027" :
            proz >= 6 ? "#fc8d59" :
            proz >= 2 ? "#fee08b" :
            proz >= 0 ? "#ffffbf" :
            proz >= -6 ? "#d9ef8b" :
            proz >= -10 ? "#91cf60" :
            "#1a9850";
        //['#d73027','#fc8d59','#fee08b','#ffffbf','#d9ef8b','#91cf60','#1a9850']

        L.polyline(
            [
                [p1.lat, p1.lng],
                [p2.lat, p2.lng],
            ], {
                color: farbe,
            }
        ).addTo(karte);

    }

});