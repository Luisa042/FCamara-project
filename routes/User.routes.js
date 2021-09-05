const { Router } = require('express');
const userRepo = require('../repository/user.dao');
const router = Router();

router.post('/register', async (req, res) => {
    try {
        const user = await userRepo.register(req.body);
        res.status(201).json(user);
        
    } catch (error) {
        return res.status(500).json(error.message);
    }
});



module.exports = router;