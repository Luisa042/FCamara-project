const { Router } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = Router();
const saltRounds = 12;

router.post('./register', async (req, res) => {

    try {
        const user = await User.create(req.body);
        return res.send({ user });
        
    } catch (error) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});



module.exports = router;