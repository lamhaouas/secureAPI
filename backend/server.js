// Imports
const http = require('http');
const app = require('./app');

// server init
const server = http.createServer(app);




server.listen(3000);