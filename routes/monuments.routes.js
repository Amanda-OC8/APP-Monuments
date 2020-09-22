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
    
    if (district && area) {
        Monument.find({ "address.districtURL": { $in: [district] }, "address.areaURL": { $in: [area] } })
            .then(foundMonuments => res.render("monuments/monument-search", {foundMonuments}))
            .catch(err => next(err))
    
    } else if (district) {
        Monument.find({ "address.districtURL": { $in: [district] } })
            .then(foundMonuments => res.render("monuments/monument-search", {foundMonuments}))
            .catch(err => next(err))
    } else if (area) {
        Monument.find({ "address.areaURL": { $in: [area] } })
            .then(foundMonuments => res.render("monuments/monument-search", {foundMonuments}))
            .catch(err => next(err))
    }
 

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
            

            Activity.find({ "monuments": { $in: [monumentId] } })
                .then(foundActivities => {
                    res.render("monuments/monument-detail", { monument: foundMonument, activities: foundActivities })
                }) 
                .catch(err => console.log(err))
            
            
        })
        .catch(err => console.log(err))

    
})


module.exports = router