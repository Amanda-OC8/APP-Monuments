const express = require('express');
const router = express.Router();
const Activity = require("../models/activity.model")
const Monument = require("../models/monuments.model")

router.get('/ActData').get((req, res, next) => {
    Activity.find()
        .then(allAct => res.json(allAct))
        .catch(err => next(err))
})

router.route('/MonumentData').get((req, res, next) => {
    Monument.find()
        .then(allMonuments => res.json(allMonuments))
        .catch(err => next(err))
})

module.exports = router