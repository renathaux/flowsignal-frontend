const assert = require('node:assert/strict');
const path = require('node:path');
const test = require('node:test');

const config = require('../vercel.json');

test('Vercel routes nested customer API paths to the proxy function', async () => {
  assert.deepEqual(config.rewrites, [
    { source: '/api/proxy/:path*', destination: '/api/backend-proxy?path=:path*' },
  ]);

  const originalFetch = global.fetch;
  let upstreamRequest;
  global.fetch = async (url, options) => {
    upstreamRequest = { url: String(url), options };
    return new Response(JSON.stringify({ detail: 'AUTHENTICATION_REQUIRED' }), {
      status: 401,
      headers: { 'content-type': 'application/json' },
    });
  };

  const response = {
    headers: {},
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.statusCode = code; return this; },
    send(body) { this.body = body; return this; },
    json(body) { this.body = body; return this; },
  };

  try {
    const handler = require(path.join('..', 'api', 'backend-proxy.js'));
    await handler({
      method: 'GET',
      query: { path: 'user/deriv/binary/v5/signal' },
      headers: { authorization: 'FlowSignalUser test-session' },
    }, response);
  } finally {
    global.fetch = originalFetch;
  }

  assert.equal(upstreamRequest.url,
    'https://flowsignal-backend-3.onrender.com/user/deriv/binary/v5/signal');
  assert.equal(upstreamRequest.options.headers.authorization, 'FlowSignalUser test-session');
  assert.equal(response.statusCode, 401);
});
