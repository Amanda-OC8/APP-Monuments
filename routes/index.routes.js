const express = require('express')
const router = express.Router()

// Middleware config for the loggin authentication 
const checkLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render('index', { loginErrorMessage: 'Acceso restringido' })

router.get('/', (req, res) => res.render('index'))

router.get("/stats", checkLoggedIn, (req, res, next) => res.render("stats-page"))


module.exports = router