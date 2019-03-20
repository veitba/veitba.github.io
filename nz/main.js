// alert("Hallo Welt")

const div = document.getElementById("map");
const breite = div.getAttribute("data-lat");
const laenge = div.getAttribute("data-lng");
const titel = div.getAttribute("data-title");


// console.log("Breite =",breite,"Länge =",laenge,"Titel =",titel)

// Karte initialisieren
let karte = L.map("map");
// console.log(karte);

// auf Ausschnitt zoomen
karte.setView(
    [breite,laenge],
    13
);

// Open Streetmap einbauen
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(karte);
