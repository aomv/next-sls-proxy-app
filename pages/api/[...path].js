import httpProxy from 'http-proxy'

// Get the actual API_URL as an environment variable. For real
// applications, you might want to get it from 'next/config' instead.
const API_URL = `http://icazu610bk.execute-api.us-east-1.amazonaws.com/development`;

export const config = {
    api: {
        bodyParser: false
    }
}

const proxy = httpProxy.createProxyServer();

export default (req, res) => {
  return new Promise((resolve, reject) => {
    req.url = req.url.replace(/^\/api/, '');
  
    proxy.once('error', reject);
    res.on('finish', resolve);
  
    proxy.web(req, res, {
      target: API_URL,
      followRedirects: true,
      changeOrigin: true,
    });
  });
};
