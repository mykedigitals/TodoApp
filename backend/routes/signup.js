// Validate incoming data using Joi
// Does the user exists, if it doesn't we create a new user
// we hash the password and save the user, library used to password hashing is called "bcrypt"

const Joi = require("joi")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const express = require("express")
const { User } = require("../models/user")

const router = express.Router()

router.post("/", async ( req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(6).max(200).required()
    })

    const { error } = schema.validate(req.body)
    
    if (error) return res.status(400).send(error.details[0].message)

    try {
        // Check if this user already exist
        
        let user = await User.findOne({ email: req.body.email})
        if(user) return res.status(400).send("User already exist...")
        
        // Create a new user
        
        const {name, email, password} = req.body

        user = new User({
            name, email, password
        })

        const salt = bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, 10)

        //This saves the user
        await user.save()

        //this keeps user signed in

        const secretKey = process.env.SECRET_KEY
        const token = jwt.sign({ _id: user._id, name: user.name, email: user.email}, secretKey)
        
        res.send(token)

    } catch(error){
        res.status(500).send(error.message);
        console.log(error.message)
    }
})

module.exports = router