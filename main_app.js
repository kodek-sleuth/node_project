//Import Http verb which is going to  make server
const http = require('http')

//Import the application instance
const app = require('./app/app_init')

//Create the port
const port = 5000

//Connect App  with Server
const server_run=http.createServer(app)

//Listen for request on Port
server_run.listen(port)