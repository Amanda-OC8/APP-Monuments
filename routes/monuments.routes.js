const express = require("express")
const router = express.Router()

const Monument = require("../models/monuments.model")

const Activity = require("../models/activity.model")

// Middleware config for the loggin authentication 

const checkLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render('index', { loginErrorMessage: 'Acceso restringido' })
  


// Search monument for area and district    
router.get("/", (req, res, next) => {

    // Get the districts and areas of each monument
    Monument.find({}, { "address.districtURL": 1, "address.areaURL": 1 })
        .then(foundElements => {
            let arrDistrict = foundElements.map(elm => elm.address.districtURL)
            const setDistrict = new Set(arrDistrict)
            const uniqueDistrict = Array.from(setDistrict)

            let arrArea = foundElements.map(elm => elm.address.areaURL)
            const setArea = new Set(arrArea)
            const uniqueArea = Array.from(setArea)

            const areasArr = [uniqueDistrict, uniqueArea]
           
            res.render("monuments/monument-search", { District: areasArr[0], Area: areasArr[1] })
        })
        .catch(err => next(err))

  
})

// Show the results
router.get("/results", (req, res, next) => {

    const district = req.query.districtQuery
    const area = req.query.areaQuery
    let searchObj = {}

    if (district != "---" && area != "---") {
        searchObj = {
            "address.districtURL": { $in: [district] },
            "address.areaURL": { $in: [area] }
        }
    } else if (area == "---") {
        searchObj = { "address.districtURL": { $in: [district] } }
    } else if (district == "---") {
        searchObj = { "address.areaURL": { $in: [area] } }
    }

    // Create promises
    const filterListPromise = Monument.find({}, { "address.districtURL": 1, "address.areaURL": 1 })
    const filterMonumentsPromise = Monument.find(searchObj)
    
    Promise.all([filterListPromise, filterMonumentsPromise])
        .then(results => {
            //Get the districts and areas again
            let arrDistrict = results[0].map(elm => elm.address.districtURL)
            const setDistrict = new Set(arrDistrict)
            const uniqueDistrict = Array.from(setDistrict)

            let arrArea = results[0].map(elm => elm.address.areaURL)
            const setArea = new Set(arrArea)
            const uniqueArea = Array.from(setArea)

            const areasArr = [uniqueDistrict, uniqueArea]
            res.render("monuments/monument-search", { foundMonuments: results[1], District: areasArr[0], Area: areasArr[1]  })
        })
        .catch(err => next(err))
    
 
})


// Show all monuments
router.get("/all", (req, res, next) => {

    Monument.find()
        .then(allMonuments => res.render("monuments/monument-all", { allMonuments }))
        .catch(err => next(err))
})

router.get("/:monument_id",  (req, res, next) => {
    const monumentId = req.params.monument_id

    const monumentPromise = Monument.findById(monumentId)
    const activityPromise = Activity.find({ "monuments": { $in: [monumentId] } })

    Promise.all([monumentPromise, activityPromise])
        .then(results => res.render('monuments/monument-detail', { monument: results[0], activities: results[1] }))
        .catch(err => next(err))
    
})


module.exports = router