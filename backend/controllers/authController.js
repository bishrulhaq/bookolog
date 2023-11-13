const { Sequelize } = require('sequelize');
const { user } = require('../models');
const bcrypt = require('bcrypt');
const registerValidation = require('../validations/registerValidation');

const authController = {

    login: async (req, res) => {

        const { email, password } = req.body;

        try {
            const user = await user.findOne({ where: { email } });

            if (user && bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({ id: user.id, email: user.email }, 'your-secret-key', {
                    expiresIn: '1h',
                });

                res.json({ token });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }

    },

    register: async (req, res) => {

        const { error } = registerValidation.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { email, password, first_name, last_name } = req.body;

        try {
            const existingUser = await user.findOne({ where: { email } });

            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const newUser = await user.create({
                email: email,
                first_name: first_name,
                last_name: last_name,
                password: password,
            });

            res.status(200).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

};

module.exports = authController;