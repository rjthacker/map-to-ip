// Selectors
const input = document.querySelector('.ip-input');
const ipAddress = document.getElementById('ip-address');
const area = document.getElementById('area');
const timezone = document.getElementById('timezone');
const isp = document.getElementById('isp');
const button = document.querySelector('.ip-input-button');

// Event Listeners
button.addEventListener('click', dataChange);

// Functions
function passData(x) {
  // Passes data as text to the elements on the DOM
  ipAddress.innerText = x.ip;
  area.innerText = `${x.location.city}, ${x.location.region} ${x.location.postalCode}`;
  timezone.innerText = x.location.timezone;
  isp.innerText = x.isp;
  // Sets the latitude and longitude
  let lat = x.location.lat;
  let lng = x.location.lng;
  // Sets the view for the map
  mymap.setView([`${lat}`, `${lng}`]);
}

function dataChange(event) {
  // Prevent form from submitting
  event.preventDefault();
  if (typeof input.value === 'string' || input.value instanceof String) {
    fetch(
      // The input value is passed onto the request as a domain address
      `https://geo.ipify.org/api/v1?apiKey=at_g7TXTeW9W9MpvLjvHESHIX0Apsjkf&domain=${input.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        passData(data);
      })
      .catch((error) => console.log('ERROR'));
  } else {
    fetch(
      // The input value is passed onto the request as a ip address
      `https://geo.ipify.org/api/v1?apiKey=at_g7TXTeW9W9MpvLjvHESHIX0Apsjkf&ipAddress=${input.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        passData(data);
      })
      .catch((error) => console.log('ERROR'));
  }
  // Clears input after submitting
  input.value = '';
}

// Leaflet Library
let mymap = L.map('mapid', { zoomControl: false }).setView(
  [39.7402, -84.179],
  12
);

L.tileLayer(
  'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 17,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      'pk.eyJ1IjoidGhlaGlkZGVuY2hlZXNlIiwiYSI6ImNrZXVvOXZiejA1ZWYzMHFvaGFmM2M5NnkifQ.jb1N_cvW0uTEdXdqs5BArQ',
  }
).addTo(mymap);
