const mongodb = require('../../mongo/connect');
const createServer = require('../create_server');
const makeRequest = require('../support/make_request');

describe('/register_user', function () {
  let db, server, port = 25252;

  beforeAll(function (done) {
    mongodb.connect()
      .then(function (database) { db = database; })
      .then(function () { return db.collection('users').deleteMany({}); })
      .then(function () { done(); });
  });

  beforeAll(function () {
    const deps = {
      saveUser: require('../../mongo/save_user')
    };
    const actions = {
      registerUser: require('../../app/register_user')
    };
    server = createServer(deps, actions);
    server = server.listen(port);
  });

  afterAll(function () {
    server.close();
    mongodb.close();
  });

  it('fails, requires email and name', function (done) {
    makeRequest({
      method: 'POST',
      host: 'localhost',
      port,
      path: '/register_user',
      body: JSON.stringify({})
    })
      .then(function (response) {
        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body)).toEqual({
          email: 'EMPTY',
          name: 'EMPTY',
        });
        done();
      });
  });

  it('fails, requires email, name in payload', function (done) {
    makeRequest({
      method: 'POST',
      host: 'localhost',
      port,
      path: '/register_user',
      body: JSON.stringify({ name: Math.random().toString() })
    })
      .then(function (response) {
        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body)).toEqual({ email: 'EMPTY' });
        done();
      });
  });

  it('success, saves', function (done) {
    const payload = {
      email: Math.random().toString(),
      lastName: Math.random().toString(),
      name: 'supersupersupersuperlargo' + Math.random().toString(),
    };
    makeRequest({
      method: 'POST',
      host: 'localhost',
      port,
      path: '/register_user',
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual({});
        Promise.resolve()
          .then(function () {
            return db.collection('users').find().toArray();
          })
          .then(function (users) {
            expect(users).toEqual([{
              _id: users[0]._id,
              name: payload.name,
              email: payload.email,
              lastName: payload.lastName,
            }]);
          })
          .then(function () {
            done();
          });
      });
  });
});
