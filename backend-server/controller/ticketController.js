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

    const ticket = Ticket.find( req.params.id)
    if(!ticket){
        res.status(404)
        throw new Error('ticket not found')
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('ticket not authorized for user')

    }
    
    res.status(200).json(ticket)
    
   })

// @desc perform tickets for user...
// @route /api/tickets/:id
// @access private
const getTicket = asyncHandler(async (req, res) => {
    console.log('getting ticket by id...!!')
    // get user using id and jwt
    const user = findUser(req)

    const tickets = Ticket.find({user: req.user.id})
    res.status(200).json(tickets)
    
   })

   const findUser = async (req) => {
    let userId = req.user.id

    const user = await User.findById(userId)

    if(!user){
        res.status(401)
        throw new Error('user not found')
    }
    return user
   }
// @desc perform tickets for user...
// @route /api/tickets
// @access private
const createTicket = asyncHandler(async (req, res) => {
    console.log('creating ticket!!')
    const { product, description } = req.body
    
    if(!product || !description){
        res.status(400)
        throw new Error('need to provide a product and/or description')
    }
    const user  = findUser(req)

    const ticket = await Ticket.createTicket({product, description, user: user.id, status: 'new'})
    res.status(201).json(ticket)
    
   })
   module.exports = {
    getTickets,
    getTicket,
    createTicket,
}
