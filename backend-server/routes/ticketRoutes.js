const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {
  createTicket,
  getTickets,
  getTicket,

} = require('../controller/ticketController')


router.route('/').get(protect, getTickets).post(protect, createTicket)

module.exports = router