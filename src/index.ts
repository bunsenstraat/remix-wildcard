import './LoadEnv'; // Must be the first import
import https from 'https';
import fs from 'fs';
import app from '@server';
import logger from '@shared/Logger';
import vhost from 'vhost';
import { embedly } from './hosts/embedly';
import { ipfsPlugin } from './hosts/ipfs-plugin';
import { remixProject } from './hosts/remix-project';

// app.use(vhost('*', remixProject()));

app.use(vhost('remixproject.org', remixProject()));
app.use(vhost('www.remixproject.org', remixProject()));
app.use(vhost('embedly.remixproject.org', embedly()));
app.use(vhost('*.dyn.plugin.remixproject.org', ipfsPlugin()));

// Start the server
const port = Number(80);
app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});

const httpsServer = https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/remixproject.org/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/remixproject.org/fullchain.pem'),
  }, app);
  
httpsServer.listen(443, () => {
    logger.info('HTTPS Server running on port 443');
});
