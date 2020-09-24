let map

function initMap() {
  getPlaceDataFromAPI()
}

function getPlaceDataFromAPI() {

  axios.get('/api/monument/')
    .then(response => drawMap(response.data) )
    .catch(err => console.log('Hubo un error:', err))
}


function drawMap(monuments) {

  let center = {
    lat: 0,
    lng: 0
  }
  
  map = new google.maps.Map(document.querySelector('#all-map'), { center, zoom: 14, })

  
  monuments.forEach(elm => {
    
    let center = {
      lat: elm.location.coordinates[0],
      lng: elm.location.coordinates[1]
    }

    //Draw the map
    new google.maps.Marker({ map, animation: google.maps.Animation.DROP, position: center })
   
    function toggleBounce() {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }

    map.setCenter({ lat: 40.417283, lng: - 3.703384})

  })
}
