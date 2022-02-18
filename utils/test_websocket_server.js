const WebSocket = require('ws');
const port = 3131;
const wss = new WebSocket.Server({ port: port })
console.log(`Listening on port: ${port}`)

wss.on('connection', ws => {
    ws.on('message', message => {
        console.log(`Received message => ${message}`)
        ws.send('Message Received')
    })
    ws.send('Connected!')
})

