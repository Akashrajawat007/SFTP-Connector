const Client = require('ssh2-sftp-client');

const sftp = new Client();

async function connect(params) {
  const { host, port, username, password } = params;
  try {
    await sftp.connect({
      host,
      port,
      username,
      password
    });
    return 'Connected to SFTP server';
  } catch (err) {
    return err.message;
  }
}

async function getStatus() {
  try {
    return sftp.exists('.');
  } catch (err) {
    return err.message;
  }
}

async function getList(path) {
  try {
    return sftp.list(path);
  } catch (err) {
    return err.message;
  }
}

async function uploadFile(localPath, remotePath) {
  try {
    return sftp.put(localPath, remotePath);
  } catch (err) {
    return err.message;
  }
}

async function downloadFile(remotePath, localPath) {
  try {
    return sftp.get(remotePath, localPath);
  } catch (err) {
    return err.message;
  }
}

async function removeFile(path) {
  try {
    return sftp.delete(path);
  } catch (err) {
    return err.message;
  }
}

async function disconnect() {
  try {
    await sftp.end();
    return 'Disconnected from SFTP server';
  } catch (err) {
    return err.message;
  }
}

module.exports = {
  connect,
  getStatus,
  getList,
  uploadFile,
  downloadFile,
  removeFile,
  disconnect
};
