const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const box = {};
vm.createContext(box);
vm.runInContext(fs.readFileSync(__dirname + '/routes.js', 'utf8'), box);
for (const uri of ['/', '/index.html', '/servicios', '/nosotros', '/university', '/contacto']) {
  assert.equal(box.handler({ request: { uri, method: 'GET' } }).uri, '/index.html');
}
for (const uri of ['/assets/missing.js', '/img/mainframe.png', '/api', '/no-existe', '/assets/']) {
  assert.equal(box.handler({ request: { uri, method: 'GET' } }).uri, uri);
}
const redirect = box.handler({ request: { uri: '/contacto/', querystring: { q: { value: 'a b' }, x: { multiValue: [{value:'1'}, {value:'2'}] } } } });
assert.equal(redirect.statusCode, 302);
assert.equal(redirect.headers.location.value, '/contacto?q=a%20b&x=1&x=2');
console.log('12 casos de rutas aprobados.');
