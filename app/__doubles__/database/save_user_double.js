module.exports = function () {
  const double = function saveUser(data) {
    const result = { insertedId: Math.random() };
    double.params.push(data);
    double.results.push(result);
    return Promise.resolve(result);
  };
  double.params = [];
  double.results = [];
  return double;
};
