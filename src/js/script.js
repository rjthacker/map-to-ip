var mymap = L.map('mapid', { zoomControl: false }).setView(
  [39.759991, -84.189594],
  13
);

L.tileLayer(
  'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 15,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      'pk.eyJ1IjoidGhlaGlkZGVuY2hlZXNlIiwiYSI6ImNrZXVvOXZiejA1ZWYzMHFvaGFmM2M5NnkifQ.jb1N_cvW0uTEdXdqs5BArQ',
  }
).addTo(mymap);
