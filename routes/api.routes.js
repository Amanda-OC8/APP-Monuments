const express = require('express');
const Activity = require('../models/activity.model');
const router = express.Router();
const Monument = require('../models/monuments.model');


router.get('/monument', (req, res, next) => {
    Monument.find()
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.get('/activity', (req, res, next) => {

    Activity.find()
        .then(response => res.json(response))
        .catch(err => next(err))
})

module.exports = router