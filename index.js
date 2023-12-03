const createServer = require('./http/create_server');


const deps = {
  saveUser: require('./mongo/save_user'),
};

const actions = {
  registerUser: require('./app/register_user'),
};

createServer(deps, actions).listen(process.env.PORT, function () {
  console.log('anda mano');
});
