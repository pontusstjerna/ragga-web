const proxy = require('http-proxy-middleware');

const live = true;

module.exports = function(app) {

    // api proxy
  app.use(proxy('/api', { 
      target: live ? 'https://ragga.nocroft.se/' : 'http://localhost:3001/',
      changeOrigin: true,
    }));
};