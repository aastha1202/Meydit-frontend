const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api', createProxyMiddleware({
    target: 'https://api.cloudinary.com',
    changeOrigin: true,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': 'http://localhost:3000' // replace with your application domain
    }
  }));
};
