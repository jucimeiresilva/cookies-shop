const { Router } = require('express')

const Order = require('../models/Order.model')

const router = Router()

router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        const newOrder = await Order.create({...req.body, user: req.user.id})
        console.log(newOrder)
        res.status(200).json(newOrder)
    } catch (error) {
        res.status(500).json({ message: "Error while trying to create order", error})
    }
})


router.get('/', async (req, res) => {
    try {
        const order = await Order.find()
            res.status(200).json(order)
    } catch (error) {
        res.status(500).json({ message: "Error while trying to get all order", error})
    }
})

router.get('/:orderId', async (req, res) => {
    const {orderId} = req.params
    try {
        const order = await Order.findById(orderId).populate("user product")
            res.status(200).json(order)
    } catch (error) {
        res.status(500).json({ message: "Error while trying to get order", error})
    }
})

router.put('/:orderId', async (req, res) => {
    const { orderId } = req.params 
    try {
        const order = await Historic.findByIdAndUpdate(orderId, req.body, { new: true })
        res.status(200).json(updatedHistoric) 
    } catch (error) {
        res.status(500).json({ message: "Error while trying to update a order", error})
    }
})

router.delete('/:orderId', async (req, res) => {
    const { orderId } = req.params
    try {
        await Order.findByIdAndDelete(orderId)
        res.status(204).json({ message: "Sucess"})
    } catch (error) {
        res.status(500).json({ message: "Error while tryind to delete a order", error})
    }
})


module.exports = router