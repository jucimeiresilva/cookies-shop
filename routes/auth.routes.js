const { Router } = require('express');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/User.model');

const router = Router();

router.post('/signup', async (req, res) => {
    
    const { name, birthDate, adress, phone, email, password } = req.body;
    try {
        if (!name || !birthDate || !adress || !phone || !email || !password) {
            throw new Error ('Missing username or password');
        }
        
        const userFromDb = await User.findOne({email});
        if(userFromDb) {
            throw new Error ('Username already exists');
        }

        const salt = bcrypt.genSaltSync(12);
        const passwordHash = bcrypt.hashSync(password, salt);

        await User.create({
            name,
            birthDate,
            adress,
            phone,
            email,
            passwordHash,
        })

        res.status(201).json('User created!')
    }   catch (error) {
        res.status(500).json({message: 'Error creating user' , error: error.message})
    }
})


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            throw new Error('Missing information');
        }

        const userFromDb = await User.findOne({email});
        if (!userFromDb) {
            throw new Error('Wrong name or password');
        }

        const validation = bcrypt.compareSync(password, userFromDb.passwordHash);

        if(!validation) {
            throw new Error('Wrong name or password');
        }

        const payload = {
            id: userFromDb._id,
            email: userFromDb.email
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1day'
        });

        res. status(200).json({user: payload, token});
    }   catch(error) {
        res.status(500).json({message: 'Error trying to login', error: error.message});
    }
})

module.exports = router;