const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
} = require('../controller/userController')


// make sure 
router.post('/',  registerUser )

router.post('/login',  loginUser )















module.exports = router