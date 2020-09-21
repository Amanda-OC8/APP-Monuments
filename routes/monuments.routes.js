const express = require("express")
const router = express.Router()

const Monument = require("../models/monuments.model")

// Middleware config for the loggin authentication 

const checkLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render('index', { loginErrorMessage: 'Acceso restringido' })

router.get("/", (req, res, next) => {

    Monument.find()
        .then(allMonuments => res.render("monuments/monument-index", { allMonuments }))
        .catch(err => next(err))
})

router.get("/:monument_id",  (req, res, next) => {
    const monumentId = req.params.monument_id
    
    Monument.findById(monumentId)
        .then(foundMonument => {
            
            // Obtain the district name from the URL to show
            const districtNameURL = foundMonument.address.districtURL
            let districtiName = districtNameURL.slice(districtNameURL.indexOf("/Distrito/") + 10)
            
            // Obtain the area name from the URL to show
            const areaNameURL = foundMonument.address.areaURL
            let areaName = areaNameURL.slice(areaNameURL.indexOf("/Barrio/") + 8)
            
            foundMonument.address.districtURL = districtiName
            foundMonument.address.areaURL = areaName
            
            res.render("monuments/monument-detail", foundMonument)
        })
        .catch(err => console.log(err))

    
})


module.exports = router