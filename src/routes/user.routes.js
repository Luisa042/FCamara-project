const { Router } = require('express');
const userRepo = require('../repository/user.dao');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = Router();

router.post('/register', async (req, res) => {
    try {
        const user = await userRepo.register(req.body);
        res.status(201).json(user);
        
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userRepo.findUser(email);
        
        if (!user) {
            return res.status(400).json();
        }
        
        const compareHash = bcrypt.compareSync(password, user.password);

        
        if (!compareHash) {
            return res.status(400).json();
        }
        
        const payload = {
            id: user.id,
            user: user.name,
            email: user.email
        };
        
        const token = jwt.sign(
            payload,
            process.env.SECRET_JWT,
            {
                expiresIn: process.env.EXPIRATION_TOKEN
            },
            );
            
            res.status(200).json({ payload, token });
            
    } catch (error) {
        res.status(500).json(error);
    }
});

router.patch('/edit/:id', async (req, res) => {
    const { name, email, password } = req.body;
    const { id } = req.params;

    try {
        const user = await userRepo.updateUser(id, { name, email, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await userRepo.deleteUser(id);
        res.status(200).json({ msg: 'Usuário apagado com sucesso!' });
    } catch (error) {
        res.status(500).json(error.message);
    }
});



module.exports = router;