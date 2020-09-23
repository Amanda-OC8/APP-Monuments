const express = require('express')
const router = express.Router()



router.get('/', (req, res) => res.render('index'))

router.get("/stats", (req, res, next) => {
    Monument.find({}, { "address.districtURL": 1, "address.areaURL": 1 })
        .then(foundElements => {
            let arrDistrict = foundElements.map(elm => elm.address.districtURL)
            function uniqueValue(value, index, self) {
                return self.indexOf(value) === index;
            }
            let uniqueDistrict = arrDistrict.filter(uniqueValue);

            let arrArea = foundElements.map(elm => elm.address.areaURL)

            let uniqueArea = arrArea.filter(uniqueValue);

            res.render("stats-page", { District: uniqueDistrict, Area: uniqueArea })
        })
        .catch(err => next(err))
    
})


module.exports = router