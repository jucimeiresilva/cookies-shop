const { Router } = require('express');

const Cookies = require('../models/User.model');

const router = Router();

router.post('/', async (req, res) => {
    try {
        const newCookies = await Cookies.create(req.body);
        res.status(201).json(newCookies);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

router.get('/', async (req, res) => {
    try {
        const allCookies = await Cookies.find();
        res.status(200).json(allCookies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/', async (req, res) => {
    try {
        const
    }
});


module.exports = router;