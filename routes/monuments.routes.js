const express = require("express")
const router = express.Router()

const Monument = require("../models/monuments.model")

const Activity = require("../models/activity.model")

// Middleware config for the loggin authentication 

const checkLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render('index', { loginErrorMessage: 'Acceso restringido' })
  




// Search monument for area and district    
router.get("/", (req, res, next) => {
    Monument.find({}, { "address.districtURL": 1, "address.areaURL": 1} )
        .then(foundElements => {
            let arrDistrict = foundElements.map(elm => elm.address.districtURL)
            function uniqueValue(value, index, self) {
                return self.indexOf(value) === index;
            }
            let uniqueDistrict = arrDistrict.filter(uniqueValue);

            let arrArea = foundElements.map(elm => elm.address.areaURL)

            let uniqueArea = arrArea.filter(uniqueValue)

            res.render("monuments/monument-search", {District: uniqueDistrict, Area: uniqueArea})
        })
    .catch(err => next(err))
    
})

router.get("/results", (req, res, next) => {

    Monument.find({}, { "address.districtURL": 1, "address.areaURL": 1 })
        .then(foundElements => {
            let arrDistrict = foundElements.map(elm => elm.address.districtURL)
            function uniqueValue(value, index, self) {
                return self.indexOf(value) === index;
            }
            let uniqueDistrict = arrDistrict.filter(uniqueValue);

            let arrArea = foundElements.map(elm => elm.address.areaURL)

            let uniqueArea = arrArea.filter(uniqueValue)
            const areasArr = [uniqueDistrict, uniqueArea]
            return areasArr
            
        })
        .catch(err => next(err))
    
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
    
    Monument.find(searchObj)
        .then(foundMonuments => res.render("monuments/monument-search", {foundMonuments}))
        .catch(err => next(err))
    
 

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