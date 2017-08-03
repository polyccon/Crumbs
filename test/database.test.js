const fs = require('fs');
const dbConnection = require('./database-test/db_connection.test');
const dbBuild = require('./database-test/db_build.test');
const tape = require('tape');
const getData = require('../src/queries/getData');
const postData = require('../src/queries/postData');

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

tape('check if postData adds a new entry to database', (t) => {
  resetDatabase();
  postData('Mulino Bianco', 'Abbracci', 500, true, dbConnection, (err, res) => {
    if (err) console.log(err);
  });

  dbConnection.query('SELECT * FROM biscuits;', (err, res) => {
    if (err);
    const expected = {
      id: 4,
      name: 'Abbracci',
      brand: 'Mulino Bianco',
      chocolate: true,
      calories: 500 };
      const actual = res.rows[3];
      t.deepEquals(expected, actual, 'both rows should have same values');
      t.end();
  });
});
