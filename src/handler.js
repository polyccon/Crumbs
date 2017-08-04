const dbConnection = require('./database/db_connection');
const fs = require('fs');
const path = require('path');
const postData = require('./queries/postData');
const getData = require('./queries/getData');
const url = require("url");
const querystring = require('querystring');

const contentTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
};

const handlers = {
  home: (req, res) => {
    const filePath = path.join(__dirname, "..", "public", "index.html");
    fs.readFile(filePath, (error, file) => {
      if (error) {
        res.writeHead(500, {
          "Content-type": "text/html"
        });
        res.end("<h1>So sorry, we've had a problem on our end.</h1>");

      } else {
        res.writeHead(200, {
          "Content-type": "text/html"
        });
        res.end(file);
      }
    });
  },
  assets: (req, res) => {
    const url = req.url;
    const extension = path.extname(url);
    const filePath = path.join(__dirname, "..", "public", req.url);
    fs.readFile(filePath, (error, file) => {
      if (error) {
        res.writeHead(500, {
          "Content-type": "text/html"
        });
        res.end("<h1>So sorry, we've had a problem on our end.</h1>");

      } else {
        res.writeHead(200, {
          "Content-type": contentTypes[extension],
        });
        res.end(file);
      }
    });
  },
  queryGetData: (req, res) => {
    getData(dbConnection, (err, response) => {
      if (err) throw err;
      res.writeHead(200, {
        "Content-Type": "application/json"
      });

      res.end(JSON.stringify(response));
    });
  },
  queryPostData: (req, res) => {

    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const queries = querystring.parse(body.toString());

      postData(queries.brand, queries.name, queries.calories, queries.chocolate, dbConnection, (err) => {
        if (err) throw err;
        res.writeHead(303, {
          "Location": "/"
        });
        res.end();
      });
    })
  },

  addBiscuit: (req, res) => {
    const filePath = path.join(__dirname, "..", "public", "add-biscuit.html");
    fs.readFile(filePath, (error, file) => {
      if (error) {
        res.writeHead(500, {
          "Content-type": "text/html"
        });
        res.end("<h1>So sorry, we've had a problem on our end.</h1>");

      } else {
        res.writeHead(200, {
          "Content-type": "text/html"
        });
        res.end(file);
      }
    });
  },

  notFound: (req, res) => {
    res.writeHead(404, {
      "Content-type": "text/html"
    });
    res.end("<h1>Sorry, this page doesn't exist</h1>");
  }
}

module.exports = handlers;
