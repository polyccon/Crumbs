const fs = require('fs');

const dbConnection = require('./db_connection.test');

const sql = fs.readFileSync(`${__dirname}/db_build.test.sql`).toString();

const dbBuild = (callback) => {
  dbConnection.query(sql, (err) => {
    if (err) {
      return console.log(err);
    } else {
      if (callback) {
        callback();
      }
    }
  });
};

dbBuild();

module.exports = dbBuild;
