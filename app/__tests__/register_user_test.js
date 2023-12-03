const saveUserDouble = require('../__doubles__/database/save_user_double');

describe('registerUser', function () {
  const registerUser = require('../register_user');

  it('fails, requires email and name', function (done) {
    registerUser({}, {})
      .then(function () {
        throw 'no deberia andar';
      })
      .catch(function (errors) {
        expect(errors).toEqual({
          email: 'EMPTY',
          name: 'EMPTY',
        });
        done();
      });
  });

  it('fails, name needs 20 characters', function (done) {
    const payload = {
      email: Math.random().toString(),
      name: 'estotienepocas',
    };
    registerUser({}, payload)
      .then(function () {
        throw 'no deberia andar';
      })
      .catch(function (errors) {
        expect(errors).toEqual({
          name: 'MASLARGO',
        });
        done();
      });
  });

  it('succeeds, saves to database', function (done) {
    const deps = {
      saveUser: saveUserDouble(),
    };
    const payload = {
      email: Math.random().toString(),
      lastName: Math.random().toString(),
      name: 'supersupersupersuperlargo' + Math.random().toString(),
    };
    registerUser(deps, payload)
      .then(function (result) {
        expect(result).toEqual({});
        expect(deps.saveUser.params[0]).toEqual({
          name: payload.name,
          lastName: payload.lastName,
          email: payload.email,
        });
        done();
      });
  });
});
