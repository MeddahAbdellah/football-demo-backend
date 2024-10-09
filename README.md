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

After installation, you can verify it's installed correctly by running:

```bash
    mongorestore --version
```

### For Windows:

Follow this tutorial https://learn.microsoft.com/en-us/linux/install
