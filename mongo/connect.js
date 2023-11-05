var MongoClient = require('mongodb').MongoClient;

var client;
var connection;
var database = 'onboarding';
var url = 'mongodb://localhost:27017';
var options = { useNewUrlParser: true };

module.exports = {
  connect: function () {
    if (connection) return Promise.resolve(connection);
    const promise = MongoClient.connect(url, options);
    return promise
      .then(function (_client) {
        client = _client;
        connection = client.db(database);
        return connection;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  close: function () {
    return client.close();
  }
};
