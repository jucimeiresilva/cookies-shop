const { Router } = require('express')

const Historic = require('../models/Historic.model')

const router = Router()

router.post('/', async (req, res) => {
    const { id } = req.user
    const { product } = req.body
    try {
        const historic = await Historic.create({ product, user: id})
        res.status(200).json(historic)
    } catch (error) {
        res.status(500).json({ message: "Error while trying to create historic", error})
    }
})


router.get('/', async (req, res) => {
    try {
        const historic = await Historic.find()
            res.status(200).json(historic)
    } catch (error) {
        res.status(500).json({ message: "Error while trying to get all historic", error})
    }
})

router.put('/:historicId', async (req, res) => {
    const { historicId } = req.params 
    try {
        const historic = await Historic.findByIdAndUpdate(historicId, req.body, { new: true })
        res.status(200).json(updatedHistoric) 
    } catch (error) {
        res.status(500).json({ message: "Error while trying to update a historic", error})
    }
})

router.delete('/:historicId', async (req, res) => {
    const { hitoricId } = req.params
    try {
        await Historic.findByIdAndDelete(historicId)
        res.status(204)
    } catch (error) {
        res.status(500).json({ message: "Error while tryind to delete a historic", error})
    }
})


module.exports = router