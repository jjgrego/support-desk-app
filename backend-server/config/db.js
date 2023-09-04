const mongoose = require('mongoose')

// unable to get url from process.env.MONGO_URI, so including here
MONGO_URI='mongodb://localhost:27017/supportdeskDB'
const connectDB = async () => {

  try {
    const conn = await mongoose.connect(MONGO_URI)
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan)
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

module.exports = connectDB
