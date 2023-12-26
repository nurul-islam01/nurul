const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { parseBody } = require('next/dist/server/api-utils/node/parse-body');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();
const { NextResponse } = require('next/server');

const { sendMail } = require('./services/mail');

app.prepare().then(() => {
  createServer(async (req, res, next) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === '/mail' && req.method === 'POST') {
        const body = await parseBody(req);
        const info = await sendMail(body);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(info));
        res.end();

        // await app.render(req, res, '/api/mail', query);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on https://${hostname}:${port}`);
    });
});
