export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    const params = new URLSearchParams({
      client_id: process.env.OAUTH_CLIENT_ID,
      scope: 'repo,user',
    });
    return res.redirect(`https://github.com/login/oauth/authorize?${params}`);
  }

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET,
      code,
    }),
  });

  const { access_token, error } = await tokenRes.json();

  if (error || !access_token) {
    return res.status(401).send('Auth error: ' + (error || 'no token'));
  }

  const content = {
    token: access_token,
    provider: 'github',
  };

  const script = `<!DOCTYPE html><html><body><script>
    (function() {
      function receiveMessage(e) {
        window.opener.postMessage(
          'authorization:github:success:${JSON.stringify(content)}',
          e.origin
        );
      }
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    })()
  </scr` + `ipt></body></html>`;

  res.setHeader('Content-Type', 'text/html');
  res.send(script);
}
