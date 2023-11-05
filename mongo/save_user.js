const mongodb = require('./connect');

function saveUser(data) {
  return mongodb.connect().then(function (db) {
    return db.collection('users').insertOne({
      name: data.name,
      lastName: data.lastName,
      email: data.email,
    });
  });
}

module.exports = saveUser;
