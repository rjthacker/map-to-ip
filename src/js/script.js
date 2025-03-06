// Selectors
const input = document.querySelector('.ip-input');
const ipAddress = document.getElementById('ip-address');
const area = document.getElementById('area');
const timezone = document.getElementById('timezone');
const isp = document.getElementById('isp');
const button = document.querySelector('.ip-input-button');

let mymap;

// Event Listeners
button.addEventListener('click', dataChange);
window.addEventListener('DOMContentLoaded', () => dataChange()); // Runs on first page load

// Functions
function passData(x) {
  ipAddress.innerText = x.ip;
  area.innerText = `${x.location.city}, ${x.location.region} ${x.location.postalCode}`;
  timezone.innerText = x.location.timezone;
  isp.innerText = x.isp;

  let lat = x.location.lat;
  let lng = x.location.lng;

  // Initialize map on first run, otherwise update the view
  if (!mymap) {
    mymap = L.map('mapid', { zoomControl: false }).setView([lat, lng], 12);

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
          'pk.eyJ1IjoidGhlaGlkZGVuY2hlZXNlIiwiYSI6ImNtN3dwM2YxZDAwZDQybHE4eTBqcHl3anIifQ.shaPrc6w2BQsxpsHlVbI4w',
      }
    ).addTo(mymap);
  } else {
    mymap.setView([lat, lng]);
  }
}

function dataChange(event) {
  if (event) event.preventDefault();

  let url = `https://geo.ipify.org/api/v1?apiKey=at_g7TXTeW9W9MpvLjvHESHIX0Apsjkf`;

  if (input.value.trim()) {
    url += isNaN(input.value) ? `&domain=${input.value}` : `&ipAddress=${input.value}`;
  }

  fetch(url)
    .then((res) => res.json())
    .then((data) => passData(data))
    .catch((error) => console.log('ERROR:', error));

  input.value = '';
}
