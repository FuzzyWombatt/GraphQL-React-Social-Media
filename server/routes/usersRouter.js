const express = require('express');
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const {
    check: check,
    validationResult: validationResult,
} = require('express-validator');

const User = require('../models/User.js');
const data = require('../config/default.json');

const usersRouter = express.Router();

//@route    POST api/user
//@desc     Register a user
//@access   Public
usersRouter.post(
    '/',
    [
        check('name', 'User name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'choose a password that is 8 or more characters'
        ).isLength({ min: 8 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ msg: 'User already exists' });
            }

            user = new User({
                name,
                email,
                password,
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id,
                },
            };

            Jwt.sign(
                payload,
                data.jwtsecret,
                {
                    expiresIn: 360000,
                },
                (err, token) => {
                    if (err) {
                        throw err;
                    }
                    res.json({ token, user: payload.user });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = usersRouter;
