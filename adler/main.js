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
    [47.2, 11.2],
    8
);

// Open Streetmap einbauen
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(karte);

// Positionsmarker hinzufügen
let pin = L.marker(
    [breite, laenge]
).addTo(karte);

// Popup zum Pin hängen
pin.bindPopup(titel);



//2. Punkt
let pin2 = L.marker(
    [breite2, laenge2]
).addTo(karte);
pin2.bindPopup(titel2);

// Ferngläser


//for Schleife pin erstellen
const adlerblicke = [{
        kunde: "Wilder Kaiser ",
        standort: "Gruttenhütte",
        seehoehe: "1640",
        lat: 47.55564,
        lng: 12.31861,
    },
    {
        kunde: "Bergbahn Scheffau ",
        standort: "Brandstadl",
        seehoehe: "1640",
        lat: 47.4912,
        lng: 12.248,
    },
    {
        kunde: "Lechtal Tourismus ",
        standort: "Sonnalm Jöchelspitze",
        seehoehe: "1786",
        lat: 47.41028,
        lng: 10.60083,
    }
];
for (let blick of adlerblicke) {
    let blickpin = L.marker(
        [blick.lat, blick.lng]
    ).addTo(karte);
    blickpin.bindPopup(
        `<h1>Standort ${blick.standort}</h1>
                <p>Höhe: ${blick.seehoehe} m </p>
                <em>Kunde: ${blick.kunde}</em>`
    );
}