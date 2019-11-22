const quote = require('../').quote;
const s = quote(['a', 'b c d', '$f', '"g"']);
console.log(s);
