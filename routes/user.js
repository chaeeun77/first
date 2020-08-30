//1번
const express = require('express')
const router = express.Router()
const userModel = require('../models/user')

//회원가입
router.post('/register', (req, res) => {
    const newUser = new userModel({
        username: req.body.name,
        email: req.body.useremail,
        password: req.body.password
    })

    newUser
        .save()
        .then(user => {
            res.json({
                message: "saved data",
                userInfo: user
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
})


//로그인
router.post('/login', (req, res) => {})


//2번
module.exports = router;