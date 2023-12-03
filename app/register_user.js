module.exports = function registerUser(deps, payload) {
  return Promise.resolve()

    // ...
    .then(function () {
      const errors = {};

      if (!payload.name)
        errors['name'] = 'EMPTY';

      if (!payload.email)
        errors['email'] = 'EMPTY';

      if (Object.keys(errors).length == 0) {
        return Promise.resolve();
      }
      else {
        return Promise.reject(errors);
      }
    })

    // ...
    .then(function () {
      if (payload.name.length < 20)
        throw { name: 'MASLARGO' };
    })

    // ...
    .then(function () {
      return deps.saveUser({
        name: payload.name,
        lastName: payload.lastName,
        email: payload.email,
      });
    })

    .then(function () {
      return {};
    })

};
