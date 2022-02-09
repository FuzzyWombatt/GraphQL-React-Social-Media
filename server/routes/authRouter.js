const express = require('express');
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const {check: check, validationResult: validationResult} = require('express-validator');

const User = require('../models/User');

const data = require('../config/default.json');

const authRouter = express.Router();

//@route    POST api/auth
//@desc     Auth user and get token
//@access   Public

//need to convert email strings to lowercase to avoid any issue going forward
authRouter.post(
  "/",
  [
    check("email", "Please enter an email").isEmail(),
    check("password", "Password required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body;

    try{
        let user = await User.findOne({email});
            
        if(!user){
            return res.status(400).json({msg: 'Invalid credentials'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({msg: 'Invalid credentials'})
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        Jwt.sign(payload, data.jwtsecret, {
            expiresIn: 360000
        }, 
        (err, token) => {
            if(err){
                throw err;
            } 
            res.json({token, user: payload.user});
        })
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
  }
);

module.exports = authRouter
