const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./routes/index.js')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 4000

// Middlawares
app.use(cors())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(bodyParser.json())

app.use('/', routes)

// Error catching endware.
app.use((err, req, res, next) => {
    // eslint-disable-line no-unused-vars
    const status = err.status || 500
    const message = err.message || err
    console.error(err)
    res.status(status).send(message)
})

// Route example
app.get('/', (req, res) => {
    res.send('¡Servidor Express funcionando!')
})

module.exports = app
