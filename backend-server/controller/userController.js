const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const JWT_SECRET = 'netflix'

// @desc register a new user...
// @route /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    // Validation
    if (!name || !email || !password) {
      res.status(400)
      throw new Error('Please include all fields')
    }

    // Find if user already exists
    const userExists = await User.findOne({ email })

    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }

    console.log('register user ', req.body)
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new error('Invalid user data')
    }
  })

// @desc perform login for user...
// @route /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  console.log('login -- ', req.body)
  const {email, password} = req.body;
    const tempUser = await User.findOne({email});

    if (tempUser && (await bcrypt.compare(password, tempUser.password))){
       console.log('have tempUser in')
        res.status(200).json({
            _id: tempUser._id,
            name: tempUser.name,
            email: tempUser.email,
            token: generateToken(tempUser._id),
        })
    } else {
        console.log('hmmmm, not sure what the hell happened!')
         res.status(401)
         throw new Error('Invalid Credentials Provided by user')
     }

})


// @desc perform login for user...
// @route /api/users/login
// @access public
const getMe = asyncHandler(async (req, res) => {
  console.log('getting me!!')
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  }
  res.status(200).json(user)
  
 })

const generateToken = (userid) => {
  return jwt.sign({userid}, JWT_SECRET, {expiresIn: '30d'})
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}
