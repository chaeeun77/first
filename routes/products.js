const express = require('express');
const router = express.Router();
const productModel = require('../models/product') //만들었던 db 모델을 불러오기
const mongoose = require('mongoose');

//product data 불러오기
router.get('/total', (req, res) => {
    productModel
        .find()
        .then(results => {
            // res.json({
            //     count:results.length,
            //     products: results
            // })
            const response = {
                count: results.length,
                products: results.map(result => {
                    return{
                        id: result._id,
                        name: result.name,
                        price: result.price,
                        request: {
                            type: "GET",
                            url: "http://localhost:5000/products/" + result._id
                        }
                    }
                })
            }
            res.json(response)
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
                productInfo: {
                    id: doc._id,
                    name: doc.name,
                    price: doc.price,
                    request: {
                        type: 'GET',
                        url: "http://localhost:5000/products/" + doc._id
                    }
                }
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
router.put('/:productId', (req, res) => {
    const id = req.params.productId
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value,
        console.log(ops);
    }
    productModel
        .findByIdAndUpdate(id, {$set: updateOps})
        .then(result => {
            console.log("result is ", result)
            res.json({
                message: "updated product at " + id,
                request: {
                    type: "GET",
                    url: "http://localhost:5000/products/" + id
                }
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
})


// router.put('/', (req, res) => {
//     res.json({
//         message: 'product data 업데이트하기'
//     })
// })

//product data delete하기
router.delete('/:productId', (req, res) => {
    const id = req.params.productId
    productModel
        .findByIdAndRemove(id)
        .then(result => {
            res.json({
                message: "deleted product at " + id,
                request: {
                    type: "GET",
                    url: "http://localhost:5000/products/total"
                }
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
})

// router.delete('/', (req, res) =>  {
//     res.json({
//         message: 'product data delete하기'
//     })
// })

//detail product get API
router.get('/:productId', (req, res) => {
    const id = req.params.productId

    productModel
        .findById(id)
        .then(doc => {
            console.log(doc)
            res.json({
                message: "get product data from "+ id,
                productInfo: {
                    id: doc._id,
                    name: doc.name,
                    price: doc.price,
                    request: {
                        type: "GET",
                        url: "http://localhost:5000/products/total"
                    }
                }
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
})
module.exports = router;