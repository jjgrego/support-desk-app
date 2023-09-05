const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const asyncHandler = require('express-async-handler')

// @desc perform tickets for user...
// @route /api/tickets
// @access private
const getTickets = asyncHandler(async (req, res) => {
    console.log('getting tickets!!')
    // get user using id and jwt
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('user not found')
    }

    const tickets = Ticket.find({user: req.user.id})
    res.status(200).json(tickets)
    
   })
   // @desc perform tickets for user...
// @route /api/tickets
// @access private
const createTicket = asyncHandler(async (req, res) => {
    console.log('creating ticket!!')
    // const {}

    res.status(200).json({message: 'create ticket'})
    
   })
   module.exports = {
    getTickets,
    createTicket,
}
