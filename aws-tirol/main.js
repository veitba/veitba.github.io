let karte = L.map("map");


const kartenLayer = {
    osm: L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
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

const layerControl = L.control.layers({
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


karte.setView(
    [47.267222, 11.392778],
    15
);

//console.log(AWS);

async function loadStations() {
    const response = await fetch("https://aws.openweb.cc/stations");
    const stations = await response.json();
    const awsTirol = L.featureGroup();
    L.geoJson(stations)
        .bindPopup(function (layer) {
            //console.log("Layer ", layer);
            const date = new Date(layer.feature.properties.date);
            console.log("Datum: ", date);
            return `<h4>Name: ${layer.feature.properties.name}</h4> <br>
            Temperatur: ${layer.feature.properties.LT} °C <br>
            Höhe: ${layer.feature.geometry.coordinates[2]} m <br>
            Datum: ${date.toLocaleDateString("de-AT")}
                ${date.toLocaleTimeString("de-AT")} <br>
            Windgeschwindigkeit: ${layer.feature.properties.WG ? layer.feature.properties.WG + " km/h": "keine Daten"}
            <hr>
            <footer> Quelle: Land Tirol - <a href="https://www.data.gv.at"> data.tirol.gv.at </a></footer>`;
        }) //Popups erstellen
        .addTo(awsTirol);
    awsTirol.addTo(karte);
    karte.fitBounds(awsTirol.getBounds()); //Zoom auf die Pins
    layerControl.addOverlay(awsTirol, "Wetterstationen Tirol");

    // Windrichtung anzeigen
    const windLayer = L.featureGroup();
    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.WR) {
                let color = 'black';
                if (feature.properties.WG > 20) {
                    color = 'red';
                }
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<i style="color: ${color};transform: rotate(${feature.properties.WR}deg)" class="fas fa-arrow-circle-up fa-3x"></i>`
                    })
                });
            }
        }
    }).addTo(windLayer);
    layerControl.addOverlay(windLayer, "Windrichtung");
    windLayer.addTo(karte)

    // Temperatur Layer hinzufügen
    const tempLayer = L.featureGroup();
    const farbPalette = [
        [0, "blue"],
        [1, "orange"],
        [2, "red"],

    ]
    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.LT) {
                let color = 'red'
                for (let i = 0; i < farbPalette.length; i++) {
                    console.log(farbPalette[i], feature.properties.LT);
                    if (feature.properties.LT < farbPalette[i][0])
                        color = farbPalette[i][1]
                    break;
                }
               // let color = 'blue';
                //if (feature.properties.LT > 0) {
                //    color = 'red';
                //}
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<div class="tempLabel"; style="background-color: ${color}">${feature.properties.LT}</div>`
                    })
                });
            }
        }
    }).addTo(tempLayer);
    layerControl.addOverlay(tempLayer, "Temperatur");
    tempLayer.addTo(karte)
}
loadStations();