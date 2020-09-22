const express = require('express')
const router = express.Router()

const Activity = require("../models/activity.model")
const Monument = require("../models/monuments.model")
const User =require("../models/user.model")

router.get('/', (req, res) => res.render('index'))

router.get("/profile", (req, res, next) => {


    const activityPromise = Activity.find({ "owner": { $in: [req.user._id] } })
    const userPromise = User.findById(req.user._id).populate("monuments")

    Promise.all([activityPromise, userPromise])
        .then(results => res.render('user/profile', { activities: results[0], user: results[1] }))
        .catch(err => next(new Error(err)))

    
})

router.get("/profile/:monument_id", (req, res, next) => {

    const monumentid = req.params.monument_id
    
    Monument.findById(monumentid)
        .then(foundMonument => {
            const { username, pasword, role, monuments, activities } = req.user
            monuments.push(foundMonument)
            
            User.findByIdAndUpdate(req.user._id, { username, pasword, role, monuments, activities })
                .then(() => res.redirect("user/profile"))
                .catch(err=> console.log(err))
        })
        .catch(err => console.log(err))
})


module.exports = router