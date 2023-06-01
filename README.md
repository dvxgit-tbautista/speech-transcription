# Speech Transcription

This repository contains code for transferring a file from a remote Linux VM to your local machine using SSH and performing speech-to-text transcription using Google Cloud Speech-to-Text API.

## Prerequisites

Before running the code, make sure you have the following:

- Node.js installed on your local machine.
- Access to a Linux VM with SSH enabled.
- Set up environment variables for the following:
  - `VM_USERNAME`: The username for your Linux VM.
  - `VM_PASSWORD`: The password for your Linux VM.
  - `VM_IP`: The IP address of your Linux VM.
  - `VM_SSH`: The SSH configuration for your Linux VM.
  - Google Cloud Speech-to-Text API credentials (JSON key file) with proper authentication and authorization.

## Installation

To set up the project, follow these steps:

1. Clone this repository to your local machine.
2. Install the required dependencies by running the following command: `npm install`. This will install the necessary packages, including `ssh2` for SSH connectivity.

## Configuration

Before running the code, you need to perform the following configuration steps:

1. Update the `remotePath`, `localPath`, and `filename` variables in the `index.js` file according to your specific use case.
2. Place your Google Cloud Speech-to-Text API credentials JSON key file in the root directory of the project.
3. Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to the path of your API credentials JSON key file.

## Usage

To transfer a file from the remote Linux VM to your local machine and perform speech-to-text transcription, follow these steps:

1. Open a terminal or command prompt and navigate to the root directory of the project.
2. Run the following command to start the file transfer and transcription process: `node index.js`.
3. The script will connect to the Linux VM using SSH and initiate the file transfer process. The specified file will be copied from the `remotePath` to the `localPath`. Once the file transfer is complete, it will perform speech-to-text transcription using the Google Cloud Speech-to-Text API.
4. The transcriptions will be displayed in the console.

Once the file transfer and transcription are complete, you will see the transcriptions in the console.

Once the file transfer is complete, you will see a success message in the console.
