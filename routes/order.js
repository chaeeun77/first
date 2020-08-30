const express = require('express');
const router = express.Router();
const orderModel = require('../models/orders')

//order data 불러오기
router.get('/total', (req, res) => {

    orderModel
        .find()
        .populate('product', ['name', 'price'])
        .then(docs => {
            res.json({
                count: docs.length,
                orders: docs.map(doc => {
                    return{
                        id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: "http://localhost:5000/orders/" + doc._id
                        }
                    }
                })
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
})

//order detail get API
router.get('/:orderId', (req, res) => {
    const id = req.params.orderId

    orderModel
        .findById(id)
        .then(doc => {
            res.json({
                message: "get order data from " + id,
                orderInfo: {
                    id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: "GET",
                        url: "http://localhost:5000/orders/total"
                    }
                }
            })
        })
        .catch(err => {
            console.log("error object ", err)
            res.json({
                message: err.message
            })
        })
})

//order data 생성하기
router.post('/', (req, res) => {
    const newOrder = new orderModel({
        product: req.body.productId,
        quantity: req.body.qty
    })

    newOrder
        .save()
        .then(doc => {
            res.json({
                message: "saved order",
                orderInfo: {
                    id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: "GET",
                        url: "http://localhost:5000/orders/" + doc._id
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

//order data 업데이트하기
router.put('/:orderId', (req, res) => {
    const id = req.params.orderId
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value,
        console.log(ops)
    }

    orderModel
        .findByIdAndUpdate(id, {$set: updateOps})
        .then(docs => {
            console.log("result is ", docs)
            res.json({
                message: "updated order at " + id,
                request: {
                    type: 'GET',
                    url: "http://localhost:5000/orders/" + id
                }
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
})

//order data delete하기
router.delete('/:orderId', (req, res) => {
    const id = req.params.orderId

    orderModel
        .findByIdAndDelete(id)
        .then(docs => {
            res.json({
                message: "deleted order at " + id,
                request: {
                    type: "GET",
                    url: "http://localhost:5000/orders/total"
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