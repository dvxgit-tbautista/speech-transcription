require('dotenv').config();
const { exec } = require('child_process');

const vmUsername = process.env.VM_USERNAME;
const vmPassword = process.env.VM_PASSWORD;
const vmIP = process.env.VM_IP;
const vmSSH = process.env.VM_SSH;

// console.log('VM_USERNAME:', vmUsername);
// console.log('VM_PASSWORD:', vmPassword);
// console.log('VM_IP:', vmIP);
// console.log('VM_SSH:', vmSSH);

const fs = require('fs');
const { Client } = require('ssh2');

const remotePath = '/var/lib/asterisk/sounds/en/'; // Source path on your Linux VM
const localPath = 'C:/MovedFiles'; // Destination path in your local machine

// Specify the filename you want to copy from the remotePath
const filename = 'StarWars.wav';

const conn = new Client();

conn.on('ready', () => {
  conn.sftp((err, sftp) => {
    if (err) {
      console.error(`SFTP Error: ${err.message}`);
      conn.end();
      return;
    }

    const sourcePath = remotePath + filename;
    const destinationPath = localPath + '/' + filename;

    sftp.fastGet(sourcePath, destinationPath, (err) => {
      if (err) {
        console.error(`File transfer error: ${err.message}`);
        conn.end();
        return;
      }

      console.log('File copied successfully!');
      conn.end();
    });
  });
});

conn.on('error', (err) => {
  console.error(`SSH connection error: ${err.message}`);
});

conn.connect({
  host: vmIP,
  port: 22,
  username: vmUsername,
  password: vmPassword,
});
