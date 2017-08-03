const dbConnection = require('../database/db_connection');

const getData = (callback) => {
  dbConnection.query(`SELECT * FROM biscuits ORDER BY id DESC`, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res.rows);
    }
  });
};

module.exports = getData;
