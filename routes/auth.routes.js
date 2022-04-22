const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const router = Router();

router.post('/signup', async (req, res) => {
    
    const { name, password } = req.body;
    try {
        if (!name || !password) {
            throw new Error ('Missing username or password');
        }
        
        const userFromDb = await User.findOne({name});
        if(userFromDb) {
            throw new Error ('Username already exists');
        }

        const salt = bcrypt.genSaltSync(12);
        const passwordHash = bcrypt.hashSync(password, salt);

        await User.create({
            name,
            passwordHash,
        })

        res.status(201).json('User created!')
    }   catch (error) {
        res.status(500).json({message: 'Error creating user' , error: error.message})
    }
})

//login

router.post('/login', async (req, res) => {
    const { name, password } = req.body;
    try {
        if (!name || !password) {
            throw new Error('Missing information');
        }

        //verifico se o usuário existe
        const userFromDb = await User.findOne({name});
        if (!userFromDb) {
            throw new Error('Wrong name or password');
        }

        //valido a senha
        const validation = bcrypt.compareSync(password, userFromDb.passwordHash);

        if(!validation) {
            throw new Error('Wrong name or password');
        }

        //crio informações para o token carregar
        const payload = {
            id: userFromDb._id,
            name: userFromDb.name
        };

        //criar o token que vai carregar a informação do login
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1day'
        });

        // se não houve erros até aqui
        res. status(200).json({user: payload, token});
    }   catch(error) {
        res.status(500).json({message: 'Error trying to login', error: error.message});
    }
})

module.exports = router;