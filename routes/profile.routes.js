const express = require('express')
const router = express.Router()

const Activity = require("../models/activity.model")
const Monument = require("../models/monuments.model")
const User =require("../models/user.model")

// Middleware config for the loggin authentication 
const checkLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render('index', { loginErrorMessage: 'Acceso restringido' })

// The profile page
router.get("/", checkLoggedIn, (req, res, next) => {


    const activityPromise = Activity.find({ "owner": { $in: [req.user._id] } }, {"name": 1})
    const userPromise = User.findById(req.user._id).populate("monuments")

    Promise.all([activityPromise, userPromise])
        .then(results => res.render('user/profile', { activities: results[0], user: results[1] }))
        .catch(err => next(new Error(err)))

    
})

//Add a monument to favorite
router.get("/:monument_id", checkLoggedIn, (req, res, next) => {

    const monumentid = req.params.monument_id
    
    //Get the monument and add
    Monument.findById(monumentid)
        .then(foundMonument => {
            const { username, pasword, role, monuments, activities } = req.user
            monuments.push(foundMonument)

            //Update the data
            return User.findByIdAndUpdate(req.user._id, { username, pasword, role, monuments, activities })
        })
        .then(() => res.redirect("/profile"))
        .catch(err => console.log(err))
})

// Remove monument from favorites
router.get("/remove/:monument_id", checkLoggedIn, (req, res, next) => {

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