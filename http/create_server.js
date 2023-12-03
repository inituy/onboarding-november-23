module.exports = function createServer(deps, actions) {
  const express = require('express');
  const server = express();

  server.use(function (req, res, next) {
    const data = [];
    req.on('data', function (_) {
      data.push(_);
    });
    req.on('end', function () {
      req.body = data.join('');
      req.body = JSON.parse(req.body);
      console.log(new Date(), req.url, req.body);
      next();
    });
  });

  server.post('/register_user', function (req, res) {

    actions.registerUser(deps, req.body)
      .then(function (result) {
        res.statusCode = 200;
        res.end(JSON.stringify(result));
      })
      .catch(function (errors) {
        res.statusCode = 400;
        res.end(JSON.stringify(errors));
      })

  });

  return server;
};
