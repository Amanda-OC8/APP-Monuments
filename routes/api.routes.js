const express = require('express');
const Activity = require('../models/activity.model');
const router = express.Router();
const Monument = require('../models/monuments.model');

//Call to get information about the monuments
router.get('/monument', (req, res, next) => {
    Monument.find()
        .then(response => res.json(response))
        .catch(err => next(err))
})

//Call to get information about the activities
router.get('/activity', (req, res, next) => {
    Activity.find()
        .then(response => res.json(response))
        .catch(err => next(err))
})

module.exports = router