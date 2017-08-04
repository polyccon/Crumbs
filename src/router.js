const handlers = require('./handler.js');
const url = require('url');

const router = (req, res) => {
  const routes = {
    '/': handlers.home,
    '/biscuits': handlers.getBiscuits,
    '/add-biscuit': handlers.addBiscuit,
    '/style.css': handlers.assets,
    '/main.css': handlers.assets,
    '/index.js': handlers.assets,
    '/dom.js': handlers.assets,
    '/post-biscuit': handlers.postBiscuit,
  };

  const endpoint = url.parse(req.url).pathname;
  if (routes[endpoint]) {
    routes[endpoint](req, res);
  } else {
    handlers.notFound(req, res);
  }
};

module.exports = router;
