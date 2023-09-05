const dotenv = require('dotenv')
const express = require('express')

const colors = require('colors')
const connectDB = require('./config/db')
const {errorHandler} = require('./middleware/errorMiddleware')

const PORT = 8080
dotenv.config()

connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

app.use(errorHandler)
app.listen(PORT, () => {
    console.log((`server started on port ${PORT}...`))
})

