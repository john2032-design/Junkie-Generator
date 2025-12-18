// api/generate.js
// Vercel serverless function that proxies the external JX generator API
// Avoids CORS issues when calling from the browser.

module.exports = async (req, res) => {
  // Handle preflight (CORS)
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  const TARGET = 'https://api.bypass.ceo/bypass/free/jx/generator/';

  try {
    // Using the built-in fetch available in the Node runtime on Vercel
    const response = await fetch(TARGET, { method: 'GET' , headers: { Accept: 'application/json' } });
    const data = await response.json();

    // Return proxied JSON to the client.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(data);
  } catch (err) {
    console.error('Proxy error:', err && err.message ? err.message : err);
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(502).json({ error: 'proxy_error', message: String(err) });
  }
};
