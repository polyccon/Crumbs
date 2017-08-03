const dbConnection = require('../database/db_connection');
// add a biscuit to the biscuits table
const postData = (brand, name, calories, chocolate, cb) => {
  dbConnection.query('INSERT INTO biscuits (brand, name, calories, chocolate) VALUES ($1, $2, $3, $4)', [brand, name, calories, chocolate], (err, res) => {
    if (err) {
      return cb(err);
    } else {
      cb(null, res);
    }
  })
}
