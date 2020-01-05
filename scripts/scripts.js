//Globals
let clickedSite;
let snippet;
let placeToSearch;
let pos;
let map;
let bounds;
let infoWindow;
let currentInfoWindow;
let service;
let infoPane;
let nameElem = document.querySelector(".place");
let addressElem = document.querySelector(".address");
let photoElem = document.querySelector(".photo");
let snippetElem = document.querySelector(".snippet");
let wikiElem = document.querySelector(".wiki");
let buttontext = document.querySelector(".wiki p");

let check;
let noInfo =
  "No information found for this location on Wikipedia. Click below to find out how to make one!";

async function getFromWiki() {
  try {
    const response = await axios.get(
      "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=1&prop=extracts&exsentences=3&explaintext=1&gsrsearch=" +
        placeToSearch
    );

    for (var i in response.data.query.pages) {
      check = response.data.query.pages[i].title;
      snippet = response.data.query.pages[i].extract;
    }

    if (placeToSearch == check || placeToSearch.includes(check)) {
    } else {
      snippet = noInfo
      buttontext.textContent ='Create an page';
  
    }
  } catch (error) {
    console.error(error);
  }
}

function initMap() {
  bounds = new google.maps.LatLngBounds();
  infoWindow = new google.maps.InfoWindow();
  currentInfoWindow = infoWindow;

  infoPane = document.getElementById("panel");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map = new google.maps.Map(document.getElementById("map"), {
          center: pos,
          zoom: 15,
          styles: [
            {
              elementType: "geometry",
              stylers: [
                {
                  color: "#f5f5f5"
                }
              ]
            },
            {
              elementType: "labels.icon",
              stylers: [
                {
                  visibility: "off"
                }
              ]
            },
            {
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#616161"
                }
              ]
            },
            {
              elementType: "labels.text.stroke",
              stylers: [
                {
                  color: "#f5f5f5"
                }
              ]
            },
            {
              featureType: "administrative.land_parcel",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#bdbdbd"
                }
              ]
            },
            {
              featureType: "poi",
              elementType: "geometry",
              stylers: [
                {
                  color: "#eeeeee"
                }
              ]
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#757575"
                }
              ]
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [
                {
                  color: "#e5e5e5"
                }
              ]
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#9e9e9e"
                }
              ]
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [
                {
                  color: "#ffffff"
                }
              ]
            },
            {
              featureType: "road.arterial",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#757575"
                }
              ]
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [
                {
                  color: "#dadada"
                }
              ]
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#616161"
                }
              ]
            },
            {
              featureType: "road.local",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#9e9e9e"
                }
              ]
            },
            {
              featureType: "transit.line",
              elementType: "geometry",
              stylers: [
                {
                  color: "#e5e5e5"
                }
              ]
            },
            {
              featureType: "transit.station",
              elementType: "geometry",
              stylers: [
                {
                  color: "#eeeeee"
                }
              ]
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [
                {
                  color: "#c9c9c9"
                }
              ]
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#9e9e9e"
                }
              ]
            }
          ],
          disableDefaultUI: true
        });
        bounds.extend(pos);
        map.setCenter(pos);

        getNearbyPlaces(pos);
      },
      () => {
        handleLocationError(true, infoWindow);
      }
    );
  } else {
    handleLocationError(false, infoWindow);
  }
}

function handleLocationError(browserHasGeolocation, infoWindow) {
  pos = { lat: 53.806683, lng: -1.555033 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: pos,
    zoom: 15,
    disableDefaultUI: true,
    styles: [
      {
        elementType: "geometry",
        stylers: [
          {
            color: "#f5f5f5"
          }
        ]
      },
      {
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#616161"
          }
        ]
      },
      {
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#f5f5f5"
          }
        ]
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#bdbdbd"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
          {
            color: "#eeeeee"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#757575"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
          {
            color: "#e5e5e5"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#9e9e9e"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {
            color: "#ffffff"
          }
        ]
      },
      {
        featureType: "road.arterial",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#757575"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
          {
            color: "#dadada"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#616161"
          }
        ]
      },
      {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#9e9e9e"
          }
        ]
      },
      {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [
          {
            color: "#e5e5e5"
          }
        ]
      },
      {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [
          {
            color: "#eeeeee"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#c9c9c9"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#9e9e9e"
          }
        ]
      }
    ]
  });
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Geolocation permissions denied. Using default location."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
  currentInfoWindow = infoWindow;
  getNearbyPlaces(pos);
}

function getNearbyPlaces(position) {
  let request = {
    location: position,
    keyword: "place of interest",
    radius: "1000"
  };
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, nearbyCallback);
}

function nearbyCallback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    createMarkers(results);
  }
}

function createMarkers(places) {
  places.forEach(place => {
    let marker = new google.maps.Marker({
      position: place.geometry.location,
      icon: {
        url: "./mapicon.svg",
        size: new google.maps.Size(35, 35),
        scaledSize: new google.maps.Size(35, 35)
      },
      map: map,
      title: placeToSearch
    });
    google.maps.event.addListener(marker, "click", () => {
      let request = {
        placeId: place.place_id,
        fields: ["name", "formatted_address", "geometry", "photos"]
      };
      placeToSearch = place.name;
      service.getDetails(request, (placeResult, status) => {
        showDetails(placeResult, marker, status);
      });
    });
    bounds.extend(place.geometry.location);
  });

  map.fitBounds(bounds);
}

async function showDetails(placeResult, marker, status) {
  await getFromWiki();
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    showPanel(placeResult);
  } else {
    console.log("showDetails failed: " + status);
  }
}

function showPanel(placeResult) {
  if (infoPane.classList.contains("open")) {
    infoPane.classList.remove("open");
  }

  nameElem.textContent = "";
  addressElem.innerHTML = "";
  photoElem.src = "";
  snippetElem.innerHTML = "";

  nameElem.textContent = placeResult.name;
  addressElem.innerHTML = placeResult.formatted_address;

  if (placeResult.photos) {
    let firstPhoto = placeResult.photos[0];
    photoElem.src = firstPhoto.getUrl();
  }

  snippetElem.innerHTML = snippet;

  if (snippet === noInfo) {
    wikiElem.href= 'https://en.wikipedia.org/wiki/Wikipedia:How_to_create_a_page';
  } else {
  wikiElem.href = "https://en.wikipedia.org/wiki/" + placeToSearch;
  }

  infoPane.classList.add("open");
}

document.querySelector(".exit").addEventListener("click", function() {
  document.getElementById("panel").classList.remove("open");
});
