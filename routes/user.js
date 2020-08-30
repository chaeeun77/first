//1번
const express = require('express')
const router = express.Router()
const userModel = require('../models/user')
const bcrypt = require('bcryptjs')

//회원가입
router.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {

        if(err){
            return res.json({
                message: err.message
            })
        }
        else{
            const newUser = new userModel({
                username: req.body.name,
                email: req.body.useremail,
                password: hash
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
        }
    })

})


//로그인
router.post('/login', (req, res) => {})


//2번
module.exports = router;