const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    
    app.use('/api', proxy({
        target: 'https://timeline-merger-ms.juejin.im/v1/',
        changeOrigin: true,
        pathRewrite: {
            "^/api": ""
        }
    }));
    app.use('/api2', proxy({
        target: 'https://juejin.im/auth/type',
        changeOrigin: true,
        headers: { 'Content-Type': 'application/json' },
        pathRewrite: {
            "^/api2": ""
        }
    }));
    app.use('/api3', proxy({
        target: 'https://banner-storage-ms.juejin.im/v1',
        headers: { 'Content-Type': 'application/json' },
        changeOrigin: true,
        pathRewrite: {
            "^/api3": ""
        }
    }));
    app.use('/api4', proxy({
        target: 'https://short-msg-ms.juejin.im/v1',
        headers: { 'Content-Type': 'application/json' },
        changeOrigin: true,
        pathRewrite: {
            "^/api4": ""
        }
    }));

    app.use('/api5', proxy({
        target: 'https://xiaoce-timeline-api-ms.juejin.im/v1',
        headers: { 'Content-Type': 'application/json' },
        changeOrigin: true,
        pathRewrite: {
            "^/api5": ""
        }
    }));
    app.use('/api6', proxy({
        target: 'https://xiaoce-cache-api-ms.juejin.im/v1',
        headers: { 'Content-Type': 'application/json' },
        changeOrigin: true,
        pathRewrite: {
            "^/api6": ""
        }
    }));
    app.use('/api7', proxy({
        target: 'https://post-storage-api-ms.juejin.im/v1',
        headers: { 'Content-Type': 'application/json' },
        changeOrigin: true,
        pathRewrite: {
            "^/api7": ""
        }
    }));
    
}