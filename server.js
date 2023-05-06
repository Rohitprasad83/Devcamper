const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
const colors = require('colors')
const app = express()

//Load env vars
dotenv.config({ path: './config/config.env' })

//connect DB
connectDB()

//Route Files
const bootcamps = require('./routes/bootcamps')

//Dev logging middleware
if (process.env.NODE_ENV === 'dev') {
    app.use(morgan('dev'))
}

app.use('/api/v1/bootcamps', bootcamps)

const PORT = process.env.PORT || 5000

const server = app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold
    )
)

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red)
        //Close the server & exit process
    server.close(() => process.exit(1))
})