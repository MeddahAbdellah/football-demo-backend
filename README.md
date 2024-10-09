# Football Demo

This is a demo project.

## Table of Contents

- [Environment Requirements](#requirements)
- [Installation](#installation)
- [Database Population](#database-population)
- [Usage](#usage)

## Environment Requirements

- Node v18 or higher.
- NPM v10 or higher

## Installation

Explain how to install your project. Include any prerequisites and step-by-step instructions.

```bash
# Example installation steps
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
npm install  # or whatever package manager you're using
```

## Database Population

To populate the database, you'll need to install MongoDB Database Tools. Follow the instructions below based on your operating system:

### For macOS:

```bash
   brew tap mongodb/brew
   brew install mongodb-database-tools
```

### For Ubuntu/Debian:

```bash
   wget https://fastdl.mongodb.org/tools/db/mongodb-database-tools-ubuntu2004-x86_64-100.7.0.deb
   sudo apt install ./mongodb-database-tools-*-100.7.0.deb
```

### For Red Hat/CentOS:

```bash
   sudo yum install https://fastdl.mongodb.org/tools/db/mongodb-database-tools-rhel80-x86_64-100.7.0.rpm
```

### For Windows:

Follow this tutorial to set up Windows Subsystem for Linux (WSL):
https://learn.microsoft.com/en-us/linux/install

After installation, you can verify it's installed correctly by running:

```bash
    mongorestore --version
```

Once MongoDB Database Tools are installed, you can populate your database using the following command:

```bash
# Example database population command
npm run populate-db
```

## Usage

Provide instructions on how to use your project after installation. Include code examples if applicable.

```bash
# Example usage
npm run start
```
