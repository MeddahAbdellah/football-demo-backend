require("dotenv").config();
const { exec } = require("child_process");
const path = require("path");

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const host = "localhost";
const port = process.env.MONGO_PORT;
const database = "sports";
const authSource = "admin";

const fixturesPath = path.resolve("./fixtures");
const command = `mongorestore --host ${host} --port ${port} --username ${username} --password ${password} --authenticationDatabase ${authSource} --nsInclude="${database}.*" --drop "${fixturesPath}"`;

exec(command, console.log);
