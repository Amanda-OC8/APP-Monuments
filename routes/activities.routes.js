const express = require("express")
const router = express.Router()

const Activity = require("../models/activity.model")


//Index
router.get("/", (req, res, next) => {

    Activity.find()
        .then(allAct => res.render("activities/act-index", { allAct }))
        .catch(err => next(err))
    }
)

//Edit activity
router.get("/edit/:act_id", (req, res, next) => {
    const actId = req.params.act_id

    Activity.findById(actId)
        .then(foundAct => res.render("activities/act-edit", foundAct))
        .catch(err => next(err))
    }
)

router.post("/edit/:act_id", (req, res, next) => {
    const actId = req.params.act_id
    const { name, actType, shortDescription, longDescription, minParticipants, maxParticipants, minAge, maxAge, materials } = req.body

    Activity.findByIdAndUpdate(actId, { name, actType, shortDescription, longDescription, minParticipants, maxParticipants, minAge, maxAge, materials: [materials] })
        .then(() => res.redirect("/activities"))
        .catch(err => next(err))
})

// Add activity
router.get("/new", (req, res, next) => res.render("activities/act-new"))

router.post("/new", (req, res, next) => {
    const { name, actType, shortDescription, longDescription, minParticipants, maxParticipants, minAge, maxAge, materials } = req.body

    Activity.create({ name, actType, shortDescription, longDescription, minParticipants, maxParticipants, minAge, maxAge, materials: [materials] })
        .then(() => res.redirect("/activities"))
        .catch(err => next(err))
})

//Delete activity
router.get("/delete/:act_id", (req, res, next) => {
    const actId = req.params.act_id
    Activity.findByIdAndDelete(actId)
        .then(() => res.redirect("/activities"))
        .catch(err => next(err))
})


// Activity details
router.get("/:act_id", (req, res, next) => {
    const actId= req.params.act_id

    Activity.findById(actId)
        .then(foundAct => res.render("activities/act-details", foundAct))
        .catch(err => next(err))
    }   
)

module.exports = router