const http = require('http');
const handler = require('./handler');

const server = http.createServer(handler);
const port = process.env.PORT || 3000;

const startServer = () => {
  server.listen(port, () => {
    console.log(`Here be dragons... ${port}`);
  });
};

startServer();
