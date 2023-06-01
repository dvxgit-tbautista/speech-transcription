# ssh-file-transfer-example

This repository contains code for transferring a file from a remote Linux VM to your local machine using SSH.

## Prerequisites

Before running the code, make sure you have the following:

- Node.js installed on your local machine.
- Access to a Linux VM with SSH enabled.
- Set up environment variables for the following:

  - `VM_USERNAME`: The username for your Linux VM.
  - `VM_PASSWORD`: The password for your Linux VM.
  - `VM_IP`: The IP address of your Linux VM.
  - `VM_SSH`: The SSH configuration for your Linux VM.

## Installation

To set up the project, follow these steps:

1. Clone this repository to your local machine.

2. Install the required dependencies by running the following command:

   ```shell
   npm install
   ```
   
   ## Configuration

Before running the code, you can configure the following variables in the `index.js` file:

- `remotePath`: The source path on your Linux VM.
- `localPath`: The destination path on your local machine.
- `filename`: The filename you want to copy from the `remotePath`.

> Note: Make sure to update these variables according to your specific use case.

## Usage

To transfer a file from the remote Linux VM to your local machine, follow these steps:

1. Open a terminal or command prompt and navigate to the root directory of the project.

2. Run the following command to start the file transfer:

   ```shell
   node index.js
   ```
3. Make sure you have the `ssh2` package installed. If it is not already installed, you can install it by running the following command:

  ```shell
  npm install ssh2
  ```

   The script will connect to the Linux VM using SSH and initiate the file transfer process. The specified file will be copied from the `remotePath` to the `localPath`.

Once the file transfer is complete, you will see a success message in the console.
