const { Router } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = Router();

router.post('./register', async (req, res) => {

    try {

        // destructuring do req.body
    const { name, email, password } = req.body;

    const existsUser = await this.user.findOne({ name });
    const existsEmail = await this.user.findOne({ email });
    const emailValidate = /^[a-z0-9.]+@fcamara.com.br$/;
    const passValidate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,99}$/;

        // validando email da fcamara
    if (!email.match(emailValidate)) {
        return res.status(400).json({ msg: 'email não permitido, tente novamente usando @fcamara.com.br' });
    }

        // validando senha segura
    if (!password.match(passValidate)) {
        return res.status(400).json({ msg: 'Por motivos de segurança, sua senha deve conter pelo menos 6 caracteres, 1 letra maiúscula, 1 símbolo e 1 número'});
    }

        // verificando se usuário já está registrado
    if (existsUser) {
        return res.status(400).json({ msg: 'Este usuário já está registrado' });
    }

        // verificando se o email já está registrado
    if (existsEmail) {
        return res.status(400).json({ msg: 'Este email já está registrado' });

        // verificando se todos os campos estão preenchidos
    } else if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Todos os campos são obrigatórios'});

    } else {
        const salt = await bcrypt.genSalt(10); 
        password = await bcrypt.hash(password, salt);
        let newUser = await User.create({ name, email, password });
    }

        
    } catch (error) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});



module.exports = router;