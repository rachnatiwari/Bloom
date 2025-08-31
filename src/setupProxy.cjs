// Dev proxy to bypass CORS during CRA development
// This file runs in Node (CommonJS). We use .cjs so it works even when package.json has "type": "module".

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/reddit',
    createProxyMiddleware({
      target: 'https://www.reddit.com',
      changeOrigin: true,
      secure: true,
      xfwd: true,
      logLevel: 'silent',
      pathRewrite: { '^/reddit': '' },
      onProxyReq: (proxyReq, req, res) => {
        // Ensure Accept header is JSON to match fetch usage
        if (!proxyReq.getHeader('accept')) proxyReq.setHeader('accept', 'application/json');
      },
    })
  );
};
