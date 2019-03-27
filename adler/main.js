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
karte.setView(
    [breite, laenge],
    12
);

// Open Streetmap einbauen
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(karte);

// Positionsmarker hinzufügen
let pin = L.marker(
    [breite, laenge]
).addTo(karte);

let pin2 = L.marker(
    [breite2, laenge2]
).addTo(karte);

// Popup zum Pin hängen
pin.bindPopup(titel).openPopup();
pin2.bindPopup(titel2).openPopup();