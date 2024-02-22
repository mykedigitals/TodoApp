// Joi
// does the user exist
// validate password
// send token to client with jwt


const Joi = require("joi")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const express = require("express")
const { User } = require("../models/user")

const router = express.Router()

router.post("/", async ( req, res) => {
    //validate user with Joi
    const schema = Joi.object({
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(6).max(200).required()
    })

    const { error } = schema.validate(req.body)
    
    if (error) return res.status(400).send(error.details[0].message)

     // Check if this user already exist
    
    try{
        let user = await User.findOne({ email: req.body.email})
        
        if(!user) return res.status(400).send("Invalid Credentials...")

        //This is to confirm password

        const validpassword = await bcrypt.compare(req.body.password, user.password)
        if (!validpassword) return res.status(400).send("Invalid Credentials...")

        // This signs our client in... using jwt, the payload of jwt contains the userID and secret-key

        const secretKey = process.env.SECRET_KEY
        const token = jwt.sign({ _id: user._id, name: user.name, email: user.email}, secretKey)
        
        res.send(token)

    }catch(error){
        res.status(500).send(error.message);
        console.log(error.message)
    }
})


module.exports = router