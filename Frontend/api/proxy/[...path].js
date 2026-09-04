const BACKEND_ORIGIN = 'https://api.nathauxfx.com';

module.exports = async function handler(req, res) {
  try {
    const pathParts = Array.isArray(req.query?.path)
      ? req.query.path
      : String(req.query?.path || '').split('/').filter(Boolean);
    const upstreamUrl = new URL('/' + pathParts.map(encodeURIComponent).join('/'), BACKEND_ORIGIN);

    for (const [key, value] of Object.entries(req.query || {})) {
      if (key === 'path' || value === undefined || value === null) continue;
      if (Array.isArray(value)) value.forEach((item) => upstreamUrl.searchParams.append(key, String(item)));
      else upstreamUrl.searchParams.set(key, String(value));
    }

    const headers = {};
    for (const name of ['content-type', 'accept', 'authorization', 'cookie', 'x-flowsignal-csrf']) {
      const value = req.headers?.[name];
      if (value) headers[name] = value;
    }

    const method = String(req.method || 'GET').toUpperCase();
    let body;
    if (!['GET', 'HEAD'].includes(method) && req.body !== undefined && req.body !== null) {
      if (Buffer.isBuffer(req.body) || typeof req.body === 'string') body = req.body;
      else body = JSON.stringify(req.body);
      if (!headers['content-type']) headers['content-type'] = 'application/json';
    }

    const upstream = await fetch(upstreamUrl, {
      method,
      headers,
      body,
      redirect: 'manual',
      cache: 'no-store',
    });

    const contentType = upstream.headers.get('content-type');
    if (contentType) res.setHeader('Content-Type', contentType);
    const setCookie = upstream.headers.get('set-cookie');
    if (setCookie) res.setHeader('Set-Cookie', setCookie);
    res.setHeader('Cache-Control', 'no-store, max-age=0');

    const location = upstream.headers.get('location');
    if (location) res.setHeader('Location', location);

    const payload = Buffer.from(await upstream.arrayBuffer());
    res.status(upstream.status).send(payload);
  } catch (error) {
    console.error('FLOWSIGNAL_PROXY_ERROR', error);
    res.status(502).json({ ok: false, detail: 'UPSTREAM_PROXY_FAILED' });
  }
};