var express = require('express')
var cors = require('cors')
var app = express()
app.use(cors())


const charactersAPI = new APIHandler('https://datos.madrid.es/egob/catalogo/208844-0-monumentos-edificios.json')


  charactersAPI.getFullList()
    .then(allCharac => {
      console.log(allCharac)
    })
    .catch(err => console.log(`Error: ${err}`))



