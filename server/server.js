const http = require('http');
const url = require('url');
const SftpClient = require('ssh2-sftp-client');

const sftp = new SftpClient();

const PORT = 5000;

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  let data = '';
  req.on('data', chunk => {
    data += chunk;
  });
  req.on('end', async () => {
    if (pathname === '/connect') {
      const { host, port, username, password } = JSON.parse(data);
      try {
        await sftp.connect({ host, port, username, password });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Successfully connected to SFTP server.' }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `Error connecting to SFTP server: ${err.message}` }));
      }
    } else if (pathname === '/status') {
      try {
        const clientStatus = sftp.client.sftp.readyState;
        const serverStatus = sftp.serverReady;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ clientStatus, serverStatus }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `Error getting SFTP server status: ${err.message}` }));
      }
    } else if (pathname === '/list') {
      const { path } = JSON.parse(data);
      try {
        const list = await sftp.list(path);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(list));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `Error listing SFTP directory: ${err.message}` }));
      }
    } else if (pathname === '/upload') {
      const { localPath, remotePath } = JSON.parse(data);
      try {
        await sftp.put(localPath, remotePath);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'File uploaded successfully.' }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `Error uploading file to SFTP server: ${err.message}` }));
      }
    } else if (pathname === '/download') {
      const { remotePath, localPath } = JSON.parse(data);
      try {
        await sftp.get(remotePath, localPath);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'File downloaded successfully.' }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `Error downloading file from SFTP server: ${err.message}` }));
      }
    } else if (pathname === '/remove') {
      const { path } = JSON.parse(data);
      try {
        await sftp.delete(path);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'File deleted successfully.' }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `Error deleting file from SFTP server: ${err.message}` }));
      }
    } else if (pathname === '/disconnect') {
      try {
        await sftp.end();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Disconnected from SFTP server.' }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `Error disconnecting from SFTP server: ${err.message}` }));
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'API endpoint not found.' }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

