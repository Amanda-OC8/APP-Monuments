let map

function initMap() {
  getPlaceDataFromAPI()
}

function getPlaceDataFromAPI() {

  axios.get('/api/')
    .then(response => drawMap(response.data) )
    .catch(err => console.log('Hubo un error:', err))
}


function drawMap(monument) {
  //Catch the id of the current monument from the url in the front
  const currentURL = window.location.href
  let currentID = currentURL.slice(currentURL.indexOf("/monuments/") + 11)

  //Filter the array with all the monuments to find the current monument
  const currentMonument = monument.filter(elm => elm._id === currentID)
 
  // define the center
  let center= {
    lat: currentMonument[0].location.coordinates[0],
    lng: currentMonument[0].location.coordinates[1],
      }

 //Draw the map
  map = new google.maps.Map(document.querySelector('#ind-map'),
    {
      center,
      zoom: 14,
          }
  )

      new google.maps.Marker({ map, position: center })


}
