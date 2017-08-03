const fs = require('fs');
const dbConnection = require('./database-test/db_connection.test');
const dbBuild = require('./database-test/db_build.test');
const tape = require('tape');
const getData = require('../src/queries/getData');

const sql = fs.readFileSync(`${__dirname}/database-test/db_build.test.sql`).toString();

const resetDatabase = () => {
  dbConnection.query(sql, (err) => {
    if (err) throw err;
  });
};

tape('initialising tape', (t) => {
  t.equals(1, 1, '1 should equal 1 :)');
  t.end();
});

tape('Testing getData.js', (t) => {
  resetDatabase();
  const expected = [{
    id: 3,
    name: 'imaginery',
    brand: 'james',
    chocolate: true,
    calories: null,
  },
  {
    id: 2,
    name: 'oreo',
    brand: 'unknown',
    chocolate: true,
    calories: 300,
  },
  {
    id: 1,
    name: 'digestive',
    brand: 'mcvities',
    chocolate: false,
    calories: 100,
  },
  ];
  getData(dbConnection, (err, res) => {
    if (err) console.log(err);
    t.deepEquals(res, expected, 'getData should give us all rows in reverse order.');
    t.end();
  });
});
