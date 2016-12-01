# Bunkr access-token

Module to generate and validate Base58 encoded access tokens with SHA256 HMAC.
Result length is in the range of 86 to 88 characters.


# Install

`npm install @bunkr/access-token --save`


# Usage

```javascript
const token = require('@bunkr/access-token');

token.generate(23, 'secret');
// z3cDRBKbBZ1wz8ySRTQyr6rcwegegdc7j21w4k68NucYuFpzKc4aLpvqjkhunnhaMzYjt1egLcCeU8SR6EgNLjE

token.validate('z3cDRBKbBZ1wz8ySRTQyr6rcwegegdc7j21w4k68NucYuFpzKc4aLpvqjkhunnhaMzYjt1egLcCeU8SR6EgNLjE', secret)
// 23
```


# License

MIT