const fs = require('fs');

const dbConnection = require('./db_connection.test');

const sql = fs.readFileSync(`${__dirname}/db_build.test.sql`).toString();

dbConnection.query(sql, (err, res) => {
  if (err) throw err;
  console.log('Table has been created with result: ', res);
});
