// getMonumentDataAndPlot()
getActivityDataAndPlot()

function getMonumentDataAndPlot() {

    axios.get('/api/monument/')
        .then(response => printMonumentsCharts(response.data))
        .catch(err => console.log('Hubo un error:', err))
}

function getActivityDataAndPlot() {
    axios.get('/api/activity/')
        .then(response => printActCharts(response.data))
        .catch(err => console.log('Hubo un error:', err))
}

function printMonumentsCharts(data) {
  
    districitChart(data, "districtChart")
    areaChart(data, "areaChart")


}

function printActCharts(data) {

    agesChart(data, "ageChart")
    participantsChart(data, "participantsChart")

}


function districitChart(monument, id) {
    // Array with all the districts
    let arrDistrict = monument.map(elm => elm.address.districtURL)
    
     //Create an object where the key is the district name and their value, the numbers of times that appears
    let districtDistr = {};
    arrDistrict.forEach(elm => districtDistr[elm] = (districtDistr[elm] || 0) + 1)
    let numDistricits = Object.keys(districtDistr).length
    let colors= []

    for (let i = 0; i < numDistricits; i++){
        colors.push(`rgba(${Math.floor(255 / numDistricits * i)}, ${Math.floor(120 / numDistricits * i)}, ${Math.floor(100 / numDistricits * i+120)}, 0.2)`)
    }

    const data = {
        labels: Object.keys(districtDistr),
        datasets: [{
            label: 'Distribution for districts',
            data: Object.values(districtDistr),
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1
        }]
    }

    const options = {
        legend: {
            position: 'right',
            labels: {
                fontColor: '#000'
            }
        }
    }
    
    new Chart(id, { type: 'bar', data, options })
}

function areaChart(monument, id) {
    // Array with all the areas
    let arrArea = monument.map(elm => elm.address.areaURL)

    //Create an object where the key is the area name and their value, the numbers of times that appears
    let areaDistr = {};
    arrArea.forEach(elm => areaDistr[elm] = (areaDistr[elm] || 0) + 1)
      
    const data = {
        labels: Object.keys(areaDistr),
        datasets: [{
            label: 'Distribution for areas',
            data: Object.values(areaDistr),
        }]
    }

    const options = {
        legend: {
            position: 'right',
            labels: {
                fontColor: '#000'
            }
        }
    }   

    new Chart(id, { type: 'line', data, options })
}


function agesChart(act, id) {
    let minAge = act.map(elm => elm.minAge)
    let maxAge = act.map(elm => elm.maxAge)
    
    let rangeMinAge = [0, 0, 0, 0, 0]
    
    for (let i = 0; i < minAge.length; i++) {
        (minAge[i] < 7) ? rangeMinAge[0]++ : (minAge[i] >= 7 && minAge[i] <= 11) ? rangeMinAge[1]++ : (minAge[i] >= 12 && minAge[i] <= 15) ? rangeMinAge[2]++ : (minAge[i] >= 16 && minAge[i] <= 18) ? rangeMinAge[3]++ : (minAge[i] >= 19) ? rangeMinAge[4]++ : null
       
    }
   
    
    let rangeMaxAge = [0, 0, 0, 0, 0]

    for (let i = 0; i < maxAge.length; i++) {
        (maxAge[i] < 7) ? rangeMaxAge[0]++ : (maxAge[i] >= 7 && maxAge[i] <= 11) ? rangeMaxAge[1]++ : (maxAge[i] >= 12 && maxAge[i] <= 15) ? rangeMaxAge[2]++ : (maxAge[i] >= 16 && maxAge[i] <= 18) ? rangeMaxAge[3]++ : (maxAge[i] >= 19) ? rangeMaxAge[4]++ : null
        
    }
    const colors = ["rgba(255, 10, 20, 0.5)", "rgba(15, 255, 10, 0.5)", "rgba(5, 20, 255, 0.5)", "rgba(181, 67, 255, 0.5)", "rgba( 255, 161, 67 , 0.5)"]

    const data = {
        labels: ["<7 años", "7-11 años", "12-15 años", "16-18 años", ">19 años"],
        datasets: [{
            label: 'Mínima',
            data: rangeMinAge,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1
        },
            {
                label: 'Máxima',
                data: rangeMaxAge,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1
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

    new Chart(id, { type: 'bar', data, options })
}

function participantsChart(act, id) {
    let minParticipants = act.map(elm => elm.minParticipants)
    let maxParticipants = act.map(elm => elm.maxParticipants)

    let rangeMinParticipants = [0, 0, 0, 0]

    for (let i = 0; i < minParticipants.length; i++) {
        (minParticipants[i] < 5) ? rangeMinParticipants[0]++ : (minParticipants[i] >= 6 && minParticipants[i] <= 10) ? rangeMinParticipants[1]++ : (minParticipants[i] >= 11 && minParticipants[i] <= 16) ? rangeMinParticipants[2]++ : (minParticipants[i] >= 17) ? rangeMinParticipants[3]++ : null

    }

    const colors = ["rgba(255, 10, 20, 0.5)", "rgba(15, 255, 10, 0.5)", "rgba(5, 20, 255, 0.5)", "rgba(181, 67, 255, 0.5)"]
    const data = {
        labels: ["<5", "6-10", "11-16", ">17"],
        datasets: [{
            label: 'Mínimo',
            data: rangeMinParticipants,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1
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