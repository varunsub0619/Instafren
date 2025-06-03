const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');

//User registeration:
router.post("/", async (req,res)=>{ 

    try{
        const hash = await bcrypt.hash(req.body.password, 10); //bcrypt used to hash the password to store it securely
        const newUser = new User({
            username: req.body.username,
            password: hash,
            email: req.body.email,
            location: req.body.location,            
        });

        await newUser.save();

        res.status(201).json({
        status:"success",
        data:{
            username: newUser.username,
            password: newUser.password
        },
        });

    } catch(err){
        if (err.code === 11000 && err.keyValue?.username) {
            // Duplicate username
            return res.status(400).json({ message: "Username already exists" });
            }

        if (err.code === 11000 && err.keyValue?.email) {
            // Duplicate email
            return res.status(400).json({ message: "Email already exists" });
            }

        console.log(err);
    }
});

module.exports = router