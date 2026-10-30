function handler(event) {
  var request = event.request;
  var routes = ['/', '/index.html', '/servicios', '/nosotros', '/university', '/contacto'];
  var uri = request.uri;
  if (uri.length > 1 && uri.charAt(uri.length - 1) === '/' && routes.indexOf(uri.slice(0, -1)) !== -1) {
    var query = [];
    var qs = request.querystring || {};
    for (var key in qs) {
      var values = qs[key].multiValue || [qs[key]];
      for (var i = 0; i < values.length; i++) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(values[i].value));
      }
    }
    return { statusCode: 302, statusDescription: 'Found', headers: {
      location: { value: uri.slice(0, -1) + (query.length ? '?' + query.join('&') : '') }
    }};
  }
  if (routes.indexOf(uri) !== -1) request.uri = '/index.html';
  return request;
}
