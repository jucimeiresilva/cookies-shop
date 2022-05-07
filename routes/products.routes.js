const { Router } = require('express')

const Products = require('../models/Products.model')

const router = Router()

router.post('/', async (req, res) => {
    const product = req.body
    try {
        const products = await Products.create(product)
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: "Error while trying to create products", error})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const products = await Products.find()
            res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: "Error while trying to get all products", error})
    }
})

router.get('/', async (req, res) => {
    try {
        const products = await Products.find()
            res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: "Error while trying to get products", error})
    }
})

router.put('/:productsId', async (req, res) => {
    const { productsId } = req.params 
    try {
        const updatedProducts = await Products.findByIdAndUpdate(productsId, req.body, { new: true })
        res.status(200).json(updatedProducts) 
    } catch (error) {
        res.status(500).json({ message: "Error while trying to update a products", error})
    }
})

router.delete('/:productsId', async (req, res) => {
    const { productsId } = req.params
    try {
        await Products.findByIdAndDelete(productsId)
        res.status(204).json({ message: "Sucess"})
    } catch (error) {
        res.status(500).json({ message: "Error while tryind to delete a products", error})
    }
})


module.exports = router