require('dotenv').config(); // Load environment variables from a .env file

const { exec } = require('child_process'); // Import the `exec` function from the `child_process` module
const fs = require('fs'); // Import the `fs` module for file system operations
const speech = require('@google-cloud/speech'); // Import the `speech` module from the `@google-cloud/speech` package
const { Client } = require('ssh2'); // Import the `Client` class from the `ssh2` module

// Retrieve environment variable values
const vmUsername = process.env.VM_USERNAME;
const vmPassword = process.env.VM_PASSWORD;
const vmIP = process.env.VM_IP;
const vmSSH = process.env.VM_SSH;

const remotePath = '/var/lib/asterisk/sounds/en/'; // Define the source path on your Linux VM
const localPath = 'C:/MovedFiles'; // Define the destination path on your local machine
const filename = 'exercise.mp3'; // Specify the filename you want to copy from the remotePath

const client = new speech.SpeechClient(); // Create a new instance of the SpeechClient

// Define a function to transcribe audio
function transcribeAudio(filePath) {
  const file = fs.readFileSync(filePath); // Read the file from the specified filePath
  const audioBytes = file.toString('base64'); // Convert the file to base64-encoded string

  // Create an audio object with the content
  const audio = {
    content: audioBytes,
  };

  // Set the configuration for the transcription
  const config = {
    encoding: 'mp3',
    sampleRateHertz: 48000,
    languageCode: 'en-US',
  };

  // Create a request object for the transcription
  const request = {
    audio: audio,
    config: config,
  };

  // Perform the transcription using the Speech-to-Text API
  client
    .recognize(request)
    .then((response) => {
      const transcription = response[0].results
        .map((result) => result.alternatives[0].transcript)
        .join('\n'); // Extract and join the transcriptions
      console.log(`Transcription: ${transcription}`);
    })
    .catch((err) => {
      console.error('Transcription error:', err);
    });
}

const conn = new Client(); // Create a new instance of the SSH2 Client

conn.on('ready', () => {
  conn.sftp((err, sftp) => {
    if (err) {
      console.error(`SFTP Error: ${err.message}`);
      conn.end();
      return;
    }

    const sourcePath = remotePath + filename; // Define the source path on the remote VM
    const destinationPath = localPath + '/' + filename; // Define the destination path on the local machine

    sftp.fastGet(sourcePath, destinationPath, (err) => {
      if (err) {
        console.error(`File transfer error: ${err.message}`);
        conn.end();
        return;
      }

      console.log('File copied successfully!');

      const filePath = destinationPath;
      transcribeAudio(filePath); // Call the transcribeAudio function to perform speech-to-text transcription

      conn.end(); // Close the SSH connection
    });
  });
});

conn.on('error', (err) => {
  console.error(`SSH connection error: ${err.message}`);
});

// Connect to the Linux VM using SSH
conn.connect({
  host: vmIP,
  port: 22,
  username: vmUsername,
  password: vmPassword,
});
