const express = require('express')
const router = express.Router()

const Activity = require("../models/activity.model")
const Monument = require("../models/monuments.model")
const User =require("../models/user.model")

router.get("/", (req, res, next) => {


    const activityPromise = Activity.find({ "owner": { $in: [req.user._id] } })
    const userPromise = User.findById(req.user._id).populate("monuments")

    Promise.all([activityPromise, userPromise])
        .then(results => res.render('user/profile', { activities: results[0], user: results[1] }))
        .catch(err => next(new Error(err)))

    
})

router.get("/:monument_id", (req, res, next) => {

    const monumentid = req.params.monument_id
    
    Monument.findById(monumentid)
        .then(foundMonument => {
            const { username, pasword, role, monuments, activities } = req.user
            monuments.push(foundMonument)

            return User.findByIdAndUpdate(req.user._id, { username, pasword, role, monuments, activities })
        })
        .then(() => res.redirect("/profile"))
        .catch(err => console.log(err))
})

router.get("/remove/:monument_id", (req, res, next) => {

    const monumentid = req.params.monument_id

    Monument.findById(monumentid)
        .then(foundMonument => {
            const { username, pasword, role, monuments, activities } = req.user
            newMonuments = monuments.filter(elm => !elm.equals(foundMonument._id))
            
            return User.findByIdAndUpdate(req.user._id, { username, pasword, role, monuments: newMonuments, activities })  
        })
        .then(() => res.redirect("/profile"))
        .catch(err => console.log(err))
})




module.exports = router