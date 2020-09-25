let map

function initMap() {
  getPlaceDataFromAPI()
}

function getPlaceDataFromAPI() {
  // Require the monument information
  axios.get('/api/monument/')
    .then(response => drawMap(response.data) )
    .catch(err => console.log('Hubo un error:', err))
}

// Draw the map
function drawMap(monuments) {
//A initial point to start to draw
  let center = {
    lat: 0,
    lng: 0
  }
  
  // Create the map in the canvas
  map = new google.maps.Map(document.querySelector('#all-map'), { center, zoom: 14, styles: mapStyles.Retro})

// Create a infoWindow for each point, and a marker
  let infowindow = new google.maps.InfoWindow({})
  let marker

 // Add each monument in the map 
  monuments.forEach(elm => {
    
    let center = {
      lat: elm.location.coordinates[0],
      lng: elm.location.coordinates[1]
    }

    // Costum icon
    const icon = { url: "../images/ubicacion.png", scaledSize: new google.maps.Size(16, 16) }

    //Information for the pop-up window
    let setContent = `<h5>${elm.title}</h5><p>${elm.address.street}</p>`

    //Draw the map with the costum icon and window information
    marker = new google.maps.Marker({ map, animation: google.maps.Animation.DROP, position: center, icon })
    google.maps.event.addListener(marker, 'click', (function (marker) {
      return function () {
        infowindow.setContent(setContent);
        infowindow.open(map, marker);
      }
    })(marker));
   
    //Add a bounce animation when the markers appears
    function toggleBounce() {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }

  })
  map.setCenter({ lat: 40.417283, lng: - 3.703384 })
}
