const express = require('express')
const router = express.Router()



router.get('/', (req, res) => res.render('index'))

router.get("/stats", (req, res, next) => res.render("stats-page"))


module.exports = router