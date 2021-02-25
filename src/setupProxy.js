const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/internet',
        createProxyMiddleware({
            target: "http://localhost:9000",
            changeOrigin: true,
        })
    );
    app.use(
        '/intranet',
        createProxyMiddleware({
            target: "http://localhost:9500",
            changeOrigin: true,
        })
    );
};
