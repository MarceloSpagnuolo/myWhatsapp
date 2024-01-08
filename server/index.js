//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const WebSocket = require('ws')

const app = require('./src/app.js')
require('dotenv').config()
const server = app.listen(process.env.PORT || 4000, () => {
    console.log('%s listening at ' + process.env.PORT || 4000)
})

// WebSocket Server
const wsServer = new WebSocket.Server({ server })

// Handle Websocket conections
wsServer.on('connection', (ws) => {
    console.log('New conection established')

    // Handle receive messages
    ws.on('message', (message) => {
        console.log('Message received:', message.toString())

        // Send message to other connect clients
        wsServer.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message.toString())
            }
        })
    })

    // Handle close connection
    ws.on('close', () => {
        console.log('Closed Coonection')
    })
})

module.exports = wsServer
