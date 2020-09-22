const express = require("express")
const router = express.Router()

const Monument = require("../models/monuments.model")

const Activity = require("../models/activity.model")

// Middleware config for the loggin authentication 

const checkLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render('index', { loginErrorMessage: 'Acceso restringido' })
  




// Search monument for region    
router.get("/", (req, res, next) => {
    
    res.render("monuments/monument-search")
})

router.get("/results", (req, res, next) => {
    const district = req.query.districtQuery
    const area = req.query.areaQuery

    
    Monument.find({ "districtURL": {  $in: [/district/] }, "address.areaURL": { $in: [/Sol/] }})
        .then(foundMonuments => console.log(foundMonuments))
})



router.get("/all", (req, res, next) => {

    Monument.find()
        .then(allMonuments => res.render("monuments/monument-all", { allMonuments }))
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

            //Add an space before each upper case, and trim to cut the extra space before the first letter
            districtiName = districtiName.replace(/([A-Z])/g, ' $1').trim()
            areaName = areaName.replace(/([A-Z])/g, ' $1').trim()
            //Remove the possibles "- " cases
            foundMonument.address.districtURL = districtiName.replace(/(- )/g, '-')
            foundMonument.address.areaURL = areaName.replace(/(- )/g, '')

            Activity.find({ "monuments": { $in: [monumentId] } })
                .then(foundActivities => {
                    res.render("monuments/monument-detail", { monument: foundMonument, activities: foundActivities })
                }) 
                .catch(err => console.log(err))
            
            
        })
        .catch(err => console.log(err))

    
})


module.exports = router