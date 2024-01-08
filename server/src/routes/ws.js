const wsServer = require('../../index.js')
const server = require('express').Router()
require('dotenv').config()

const token = process.env.WSTOKEN
const mytoken = process.env.MYTOKEN

server.get('/webhook', async (req, res) => {
    let mode = req.query['hub.mode']
    let challenge = req.query['hub.challenge']
    let token = req.query['hub.verify_token']
    console.log(mode, challenge, token, mytoken)

    if (mode && token) {
        if (mode === 'subscribe' && token === mytoken) {
            res.send(challenge).status(200).end()
        } else {
            res.status(403)
        }
    } else {
        res.status(400)
    }
})

server.post('/webhook', (req, res) => {
    console.log('Mensaje recibido')
    console.log(req.body)
    const data = req.body
    console.log(data)
    console.log(JSON.stringify(data, null, 2))
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            console.log('Cliente:', client)
            client.send(JSON.stringify(data).toString())
        }
    })
    res.status(200).send('Datos recibidos y enviados a los clientes')
})

module.exports = server
