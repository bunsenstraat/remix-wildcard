import connect from 'connect';
var proxy = require('express-http-proxy');

export const ipfsPlugin = () => {
    const app = connect()
    app.use('/ipfs', function (req: any, res: any, next: any) {
        res.set('x-frame-options', '')
        next();
      });
    app.use('/ipfs', proxy('https://ipfsgw.komputing.org', {
        proxyReqPathResolver: (req: any) => {
            return new Promise((resolve, reject) => resolve('/ipfs' + req.url));
          }
    }))
    return app
}
