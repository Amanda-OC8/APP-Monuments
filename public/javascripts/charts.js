getMonumentDataFromAPI()

function getMonumentDataFromAPI() {

    axios.get('/api/monument/')
        .then(response => printCharts(response.data))
        .catch(err => console.log('Hubo un error:', err))
}


function printCharts(monument) {
  
    modelDoughnutChart(monument, "districtChart")
    

}



function modelDoughnutChart(monument, id) {
    // Array with all the districts
    let arrDistrict = monument.map(elm => elm.address.districtURL)
    
    //Create an object where the key is the district name and their value, the numbers of times that appears
    let districtDistr = {};
    arrDistrict.forEach(elm => districtDistr[elm] = (districtDistr[elm] || 0) + 1)
    

    const data = {
        labels: Object.keys(districtDistr),
        datasets: [
            {
                data: Object.values(districtDistr),
                               
            }
        ]
    }

    const options = {
        legend: {
            position: 'right',
            labels: {
                fontColor: '#000'
            }
        }
    }

    new Chart(id, { type: 'doughnut', data, options })
}

