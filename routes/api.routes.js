const express = require('express');
const router = express.Router();
const Monument = require('../models/monuments.model');


router.get('/', (req, res, next) => {

    Monument
        .find()
        .then(response => res.json(response))
        .catch(err => next(err))
})


module.exports = router