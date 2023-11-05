const suma = require('../suma');

describe('function suma', function () {

  it('suma cualquier combinacion de numeros', function () {
    const a = Math.random();
    const b = Math.random();
    expect(suma(a, b)).toBe(a + b);
  });

});
