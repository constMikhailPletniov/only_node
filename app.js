const http = require('http');
require('./database/database');
const { PORT } = require('./config/config');
const { router } = require('./router/router');

const server = http.createServer(async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Content-Type', 'application/json, text/plain; charset=utf-8;');
  res.setHeader('Access-Control-Max-Age', '-1');

  const bodyBuffer = [];
  req.on('data', (data) => {
    bodyBuffer.push(data);
  });

  req.on('end', async () => {
    const body = bodyBuffer.length ? JSON.parse(bodyBuffer) : null;
    await router({ req, res, body });
  });

  res.on('error', (err) => {
    console.error(err);
    res.statusCode = 500;
    res.end(JSON.stringify(err));
  });
});

server.listen(PORT, () => {
  console.log(`App listen ${PORT}`);
});
