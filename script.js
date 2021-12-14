mapboxgl.accessToken = 'pk.eyJ1IjoidHBmZWlmZiIsImEiOiJja3RyZTUwOGkwdDloMzJtcGI3ZjB6Y3hnIn0.clBSsKyZ2Nc6SyDrxOzQRg';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 1 // starting zoom
});

map.on("load", () => {
    map.addSource("wineries", {
        type: "vector",
        url: "mapbox://tpfeiff.cvg07fuv",
    });

    map.addLayer({
        id: 'wine_layer',
        source: 'wineries',
        "source-layer": "SBTW_wines-5nkuvy",
        type: "circle",
        paint: {
            "circle-color": 'red',
            "circle-radius": 6,
            "circle-stroke-width": 1,
            "circle-stroke-color": 'white'
        },

    });

});

const buttonEls = document.querySelectorAll('.filter-button');

buttonEls.forEach(button => {
    button.addEventListener('click', (e) => buttonClicked(e));
});

const buttonClicked = (e) => {
    const buttonIsSelected = e.target.classList.contains('selected');
    if (buttonIsSelected) {
        e.target.classList.remove('selected');
        map.setFilter('wine_layer', null);
    } else {
        buttonEls.forEach(button => button.classList.remove('selected'));
        e.target.classList.add('selected');
        map.setFilter('wine_layer', ['==', 'Type', e.target.dataset.manufacturer]);
    }
};

const popup = new mapboxgl.Popup({})

map.on("click", 'wine_layer', (e) => {
    const coordinates = e.lngLat;
    let wineryName = e.features[0].properties['Wine'];

    popup.setLngLat(coordinates).setHTML(wineryName).addTo(map);

});

map.on('mouseenter', 'wine_layer', () => {
    map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'wine_layer', () => {
    map.getCanvas().style.cursor = '';
});