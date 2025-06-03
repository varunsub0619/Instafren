const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//User login:
router.post("/", async (req,res)=>{ 

    try{
        const {username, password} = req.body;
        const user = await User.findOne({ username: username });
        if (!user){
            res.status(400).send({message: "User does not exist"})
            return
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch){
            res.status(401).send({message: "Incorrect password"})
            return
        }

        //Jason web token defined to provide authorization to access private routes
        const accessToken = jwt.sign({
            user: {
                id: user._id, 
                username: user.username,
                email: user.email,
                location: user.location
            }
        }, process.env.SECRET_TOKEN, {expiresIn: "20m"});
        
        //JWT stored in cookie
        res.cookie("token", accessToken, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            httpOnly: true
        })
        
        res.status(200).json({
        status:"success",
        token: accessToken
        });

    } catch(err){
        console.log(err);
    }
});

module.exports = router
