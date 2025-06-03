const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');

//Creating a post:
router.post("/", async (req,res)=>{ 

    try{
       const newPost = new Post
    } catch(err){
        console.log(err);
    }
});

module.exports = router