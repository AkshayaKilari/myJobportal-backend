const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const User = require('../models/userModal')

const registerUser = asyncHandler( async (req,res) =>{

    const {
        first_name,
        last_name,
        email,
        password,
        userType,
    } = req.body;
    if(!first_name || !email || !password || !last_name || !userType){
        res.status(400)
        throw new Error("Please add all required fields")
    }

    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error("User already exists")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        first_name,
        last_name,
        email,
        password:hashedPassword,
        userType,
    })

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.first_name + user.last_name,
            email:user.email,
            userType:user.userType,
            token:generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid User data')
    }
})

const loginUser = asyncHandler( async (req,res) =>{

    const {email,password} = req.body

    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(201).json({
            _id:user._id,
            name:user.first_name + user.last_name,
            email:user.email,
            userType:user.userType,
            token:generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})


const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
}