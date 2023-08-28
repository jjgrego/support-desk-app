const express = require('express')
const dotenv = require('dotenv')


const colors = require('colors')
const connectDB = require('./config/db')
const {errorHandler} = require('./middleware/errorMiddleware')

const PORT = 3002
dotenv.config()

connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)
app.listen(PORT, () => {
    console.log((`server started on port ${PORT}...`))
})

