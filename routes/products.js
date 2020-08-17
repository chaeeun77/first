const express = require('express');
const router = express.Router();
const productModel = require('../models/product') //만들었던 db 모델을 불러오기
const mongoose = require('mongoose');

//product data 불러오기
router.get('/total', (req, res) => {
    productModel
        .find()
        .then(results => {
            res.json({
                count:results.length,
                products: results
            })
        })
        .catch()

    // res.json({
    //     message: 'product data 불러오기'
    // })
})

//product data 생성하기
router.post('/register', (req, res) => {
    const newProduct = productModel({
        name: req.body.productname,
        price: req.body.productprice
    })

    newProduct
        .save()
        .then(doc => {
            res.json({
                message: "saved data",
                productInfo: doc
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })

    // const product = {
    //     name: req.body.productname,
    //     price: req.body.productprice
    // }
    // res.json({
    //     message: 'product data 생성하기',
    //     createdProduct: product
    // })
})

//product data 업데이트하기
router.put('/', (req, res) => {
    res.json({
        message: 'product data 업데이트하기'
    })
})

//product data delete하기
router.delete('/', (req, res) =>  {
    res.json({
        message: 'product data delete하기'
    })
})

module.exports = router;