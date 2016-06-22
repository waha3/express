'use strict'

const express = require('express');
const router = express.Router();
const home = require('../app/controllers/home.js')
const register = require('../app/controllers/register.js')
const login = require('../app/controllers/login.js')

router.get('/', home);
router.get('/register', (req, res, next) => {
    res.render('register', {
        err: req.flash('err').toString()
    })
})
router.post('/register', register)

router.get('/login', (req, res, next) => {
    res.render('login', {
        err: req.flash('err').toString(),
        success: req.flash('success').toString()
    })
})
router.post('/login', login)

module.exports = router
