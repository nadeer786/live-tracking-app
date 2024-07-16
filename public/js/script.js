const socket = io();

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      socket.emit("sendLocation", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    (err) => {
      console.log(err);
    },
    { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
  );
}

// L.map("map", {
//   center: [0, 0],
//   zoom: 2,
// });

const map = L.map("map").setView([0, 0], 3);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "Calicut, India",
}).addTo(map);

const marker = {};

socket.on("receiveLocation", (data) => {
  console.log(data);
  const { id, latitude, longitude } = data;

  map.setView([latitude, longitude], 16);

  if (!marker[id]) {
    marker[id] = L.marker([latitude, longitude]).addTo(map);
  } else {
    marker[id].setLatLng([latitude, longitude]);
  }
});

socket.on("handshake", (data) => {
  console.log(data);
});
console.log(marker);
