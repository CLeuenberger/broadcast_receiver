const WebSocket = require('ws');
const url = 'ws://0.0.0.0:3131'

function publish_to_tests(test_data){
    const connection = new WebSocket(url)
    connection.onopen = () => {
        string_data = JSON.stringify(test_data)
        connection.send(string_data)
    }
    connection.onmessage = e => {
        console.log(e.data)
    }
    connection.onerror = error => {
        connection.close()
    }
}
module.exports = {
    publish_to_tests:publish_to_tests
}
