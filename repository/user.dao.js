const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

class UserRepository {
    constructor(UserModel) {
        this.user = UserModel;
    }

    register = async (user) => { 
            // payload
        const {name, email, password} = user;
        console.log(user);

        try {
            const existsUser = await this.user.findOne({name});
            const existsEmail = await this.user.findOne({email});
            const validPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,99}$/;
            const validEmail = /^[a-z0-9.]+@fcamara.com.br$/;

            // validando email da fcamara
            if (!email.match(validEmail)) {
                throw new Error('Email não permitido, tente novamente usando @fcamara.com.br');
            }

            // validando senha segura
            if (!password.match(validPass)) {
                throw new Error('Por motivos de segurança, sua senha deve conter pelo menos 6 caracteres, 1 letra maiúscula, 1 símbolo e 1 número');
            }

            // verificando se usuário já está registrado
            if (existsUser) {
                throw new Error('Este usuário já está registrado');
            }

            // verificando se o email já está registrado
            if (existsEmail) {
                throw new Error('Este email já está registrado');

            // verificando se todos os campos estão preenchidos
            } else if (!name || !email || !password) {
                throw new Error('Todos os campos são obrigatórios');

            // criando novo usuário
            } else {
                const salt = await bcrypt.genSalt(10);
                password = await bcrypt.hash(password, salt);
                let newUser = await this.user.create({name, email, password});
                return ({
                    name: newUser.name,
                    email: newWuser.email,
                    id: newUser.id
                });
            }

        } catch (error) {
            throw new Error(error);
        }
    }

    findUser = async (email) => {
        try {
            const user = await this.user.findOne({ email });
            return user;
        } catch (error) {
            throw new Error('Usuário e email não correspondem com usuário e email registrados');
        }
    }

    updateUser = async (id, user) => {
        try {
            const updatedUser = await this.user.findByIdAndUpdate(id, user, {
                new: true
            });
            return updatedUser;
        } catch (error) {
            throw new Error();
        }
    }

    deleteUser = async (id) => {
        try {
            const deletedUser = await this.user.findByIdAndDelete(id);
            return deletedUser;
        } catch (error) {
            throw new Error();
        }
    }
}

module.exports = new UserRepository(User);
