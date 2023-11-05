const mongodb = require('../connect');

describe('saveUser', function () {
  let db;

  beforeAll(function (done) {
    mongodb.connect()
      .then(function (_) { db = _; })
      .then(function () { return db.collection('users').deleteMany({}); })
      .then(function () { done(); })
  });

  afterAll(function (done) {
    mongodb.close().then(function () { done(); });
  })

  it('saves the user', function (done) {
    const saveUser = require('../save_user');
    const user = {
      name: Math.random().toString(),
      lastName: Math.random().toString(),
      email: Math.random().toString(),
    };
    Promise.resolve()
      .then(function () {
        return saveUser(user);
      })
      .then(function () {
        return db.collection('users').findOne();
      })
      .then(function (userInDb) {
        expect(userInDb).toEqual({
          _id: userInDb._id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
        });
      })
      .then(done)
  });

});
