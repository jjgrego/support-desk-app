const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const JWT_SECRET = 'netflix'


const protect = asyncHandler(async (req, res, next) => {
   let token
console.log('protecting me...', req.headers)
   if (
     req.headers.authorization &&
     req.headers.authorization.startsWith('Bearer')
   ) {
     try {
       token = req.headers.authorization.split(' ')[1]
       const decoded = jwt.verify(token, JWT_SECRET)
       req.user = await User.findById(decoded.id).select('-password')
  
       if (!req.user) {
         res.status(401)
         throw new Error('Not authirised')
       }
 
       next()
      }catch(error){
            res.status(401)
            throw new Error('user is not authorized')
      }
   }

   if(!token){
    res.status(401)
    throw new Error('user is not authorized')
   }
})

module.exports= {
    protect,
}


