'use strict';

const token  = require('../index');
const expect = require('chai').expect;

const SECRET_KEY = 'secret';


describe('Generate', () => {
  it('generate', () => {
    const result = token.generate(128, SECRET_KEY);

    expect(result).to.be.a('string');
    expect(result).to.have.length.within(86, 88);
    expect(token.validate(result, SECRET_KEY)).to.equal(128);
  });
});


describe('Validate', () => {
  it('valid', () => {
    const tests = [
      '1TNFSkutJraZRgvBGBoN2yAxYB7HHMfa6eoE8AUa8aaxSemmqR9mBusyzFYnniEpMLPTzGbMGDTUcRoMWQM8oi',
      'z3cDRBKbBZ1wz8ySRTQyr6rcwegegdc7j21w4k68NucYuFpzKc4aLpvqjkhunnhaMzYjt1egLcCeU8SR6EgNLjE',
      '5YNJ8w44Ki9ChAPZBQiHDwajSdLRgjNf2Uuo4nWbz6PzK5NCX1gYULqQkQ5HhUvNVMyKP8d8QeJNwofGysM8tdut'
    ];

    for (let i of tests) {
      expect(token.validate(i, SECRET_KEY)).to.equal(23);
    }
  });


  it('invalid', () => {
    const tests = [
      null,
      '123',
      'qEfn2niF1nUxNdfekbu9gv2n',
      'z3cDRBKbBZ1wz8ySRTQyr6rcwegegdc7j21w4k68NucYuFpzKc4a.pvqjkhunnhaMzYjt1egLcCeU8SR6EgNLjE',
      'z3cDRBKbBZ1wz8ySRTQyr6rcwegegdc7j21w4k68NucYuFpzKc4aLpvqjkhunnhaMzYjt11111111111111111',
      '2bLajDQpjJE6Zp6XzA5tHGi7ttfYAdseF7rvXhFPV6LWnRATzonDcvwuhtG6Z9YAMw545kjx5xv5NTSXpQpvB6Zm',
      '2roNtPDb5cvKY7dzW3QphQYyCXC4DNPhmGsBj6Cbktfxiy4eRjMtxsLFkPwaKNZndBJ3HJVdUDtQZnAnCKKMRa3L'
    ];

    for (let i of tests) {
      expect(token.validate(i, SECRET_KEY)).to.equal(0);
    }
  })
});
