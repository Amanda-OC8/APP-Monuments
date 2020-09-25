const express = require("express")
const router = express.Router()

const Activity = require("../models/activity.model")
const Monument = require("../models/monuments.model")

// Middleware config for the loggin authentication 
const checkLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render('index', { loginErrorMessage: 'Acceso restringido' })


//Index
router.get("/", checkLoggedIn, (req, res, next) => {

    Activity.find({}, {"name": 1, "shortDescription": 1, "actType": 1})
        .then(allAct => res.render("activities/act-index", { allAct }))
        .catch(err => next(err))
    }
)

//Edit activity with the monument information
router.get("/edit/:act_id", checkLoggedIn, (req, res, next) => {
    const actId = req.params.act_id

    const activityPromise = Activity.findById(actId)
    const monumentPromise = Monument.find({}, {"title": 1})

    Promise.all([activityPromise, monumentPromise])
        .then(results => res.render("activities/act-edit", { activity: results[0], monuments: results[1] }))
        .catch(err => next(new Error(err)))

})

router.post("/edit/:act_id", checkLoggedIn,  (req, res, next) => {
    const actId = req.params.act_id
    const { name, actType, shortDescription, longDescription, minParticipants, maxParticipants, minAge, maxAge, materials, monuments } = req.body


    Activity.findByIdAndUpdate(actId, { name, actType, shortDescription, longDescription, minParticipants, maxParticipants, minAge, maxAge, materials, monuments})
        .then(() => res.redirect("/activities"))
        .catch(err => next(err))

})

// Add activity
router.get("/new", checkLoggedIn, (req, res, next) => {

    //Load all the monuments to the view
    Monument.find({}, {"title": 1} )
        .then(allMonuments => res.render("activities/act-new", { allMonuments }))
        .catch(err=> next(err))
    
})

router.post("/new", checkLoggedIn, (req, res, next) => {
    const { name, actType, shortDescription, longDescription, minParticipants, maxParticipants, minAge, maxAge, materials, monuments } = req.body
    const owner = req.user._id

    Activity.create({ name, actType, shortDescription, longDescription, minParticipants, maxParticipants, minAge, maxAge, materials, owner, monuments })
        .then(() => res.redirect("/activities"))
        .catch(err => next(err))

})

//Delete activity
router.get("/delete/:act_id", checkLoggedIn, (req, res, next) => {
    const actId = req.params.act_id
    
    Activity.findByIdAndDelete(actId)
        .then(() => res.redirect("/activities"))
        .catch(err => next(err))
})


// Activity details
router.get("/:act_id", checkLoggedIn, (req, res, next) => {
    const actId= req.params.act_id

    Activity.findById(actId)
        .populate("monuments")
        .then(foundAct => res.render("activities/act-details", foundAct))
        .catch(err => next(err))
    }   
)

module.exports = router