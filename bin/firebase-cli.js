#!/usr/bin/env node

"use strict";

const process = require("process");
const { createInterface } = require("readline");
const admin = require("firebase-admin");
const { writeFileSync, existsSync, readFileSync } = require("fs");
const { join } = require("path");
const { getProjectInfo } = require("../utils/getProjectInfo");
const { strHandler } = require("../utils/strHandler");

/**
 * Terminal type definition
 * @typedef {Object} Terminal
 * @property {string} command - current command
 * @property {Array<string>} commandsHistory - history of the commands
 * @property {number} delayForWrite - delay for write command
 * @property {number} lastWriteTime - the time in ms when the last symbol was write
 * @property {number} lastEnterTime - the time in ms when the enter key was pressed on the keyboard
 */

/**
 * @type {Terminal}
 */
const terminal = {
  command: "",
  commandsHistory: [],
  delayForWrite: 100,
  lastWriteTime: 0,
  lastEnterTime: 0,
};

/**
 * Path to command history file
 */
const commandsHistoryFilePath = join(__dirname, "..", "./commands.json");

/**
 * History size
 */
const historySize = 100;

/**
 * Saved path to service account key
 *
 * @type {string|undefined}
 */
let savedServiceAccountKeyPath = undefined;

// load history of commands from file
if (existsSync(commandsHistoryFilePath)) {
  try {
    const commandsHistoryFileTxt = readFileSync(commandsHistoryFilePath);
    const commandsHistoryFile = JSON.parse(commandsHistoryFileTxt);
    if (Array.isArray(commandsHistoryFile.commandsHistory)) {
      terminal.commandsHistory = commandsHistoryFile.commandsHistory.slice(
        commandsHistoryFile.commandsHistory.length - historySize - 1
      );
    }
    savedServiceAccountKeyPath = commandsHistoryFile.serviceAccountKeyPath;
  } catch (err) {}
}

// error handle
process.on("uncaughtException", (err, origin) => {
  console.log(err.message);
  process.exit(1);
});

const projectInfo = getProjectInfo(savedServiceAccountKeyPath);

const servicename = `Firebase Admin CLI (${projectInfo.serviceAccount.project_id})`;

// save history of commands and service account path to file
process.on("exit", (code) => {
  writeFileSync(
    commandsHistoryFilePath,
    JSON.stringify({
      commandsHistory: terminal.commandsHistory,
      serviceAccountKeyPath: projectInfo.serviceAccountKeyPath,
    })
  );
  process.exit(code);
});

/**
 * FastCommand type definition
 * @typedef {Object} FastCommand
 * @property {string} command
 * @property {string} title
 * @property {string} alias
 */

/**
 * @type {Array<FastCommand>}
 */
const fastcommands = [];

admin.initializeApp({
  credential: admin.credential.cert(projectInfo.serviceAccount),
});

function help() {
  console.table(fastcommands, ["command", "title", "alias"]);
}
fastcommands.push({
  command: "help()",
  title: "Сall current help",
  alias: "help()",
});

const auth = admin.auth();
fastcommands.push({
  command: "auth",
  title: "Сall firebase authorization interface",
  alias: "admin.auth()",
});

const db = admin.firestore();
fastcommands.push({
  command: "db",
  title: "Сall firebase firestore interface",
  alias: "admin.firestore()",
});

const bucket = admin
  .storage()
  .bucket(`${projectInfo.serviceAccount.project_id}.appspot.com`);
fastcommands.push({
  command: "bucket",
  title: "Сall firebase storage/bucket interface",
  alias: `admin.storage().bucket("${projectInfo.serviceAccount.project_id}.appspot.com")`,
});

const types = admin.firestore;
fastcommands.push({
  command: "types",
  title: "Сall firebase firestore types interface",
  alias: "admin.firestore",
});

const terminalInterface = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: servicename + ">",
  historySize,
  terminal: true,
  history: JSON.parse(JSON.stringify(terminal.commandsHistory)),
});

const exit = () => {
  terminalInterface.close();
};
fastcommands.push({
  command: "exit()",
  title: "Exit console",
  alias: "terminalInterface.close()",
});

/**
 * @type {Array<string>}
 */
const constants = [];
/**
 * @type {Object}
 */
const globalKeys = Object.keys(global);
/**
 * Eval async code in the context
 *
 * @param {string} str - string of the code
 * @returns
 */
async function evalInContext(str) {
  if (str && str !== "") {
    str = strHandler.call(this, str, constants, globalKeys);
    const _match = str.match(/^this\.[a-zA-Z]+\d*/);
    if (_match && _match[0])
      return await eval(
        "(async()=>{\n" + str + ";\nreturn " + _match[0] + ";\n})()"
      );
    else
      return await eval(
        "(async()=>{\n const _result = " + str + ";\nreturn _result;\n})()"
      );
  } else return;
}

help();
process.stdin.on("keypress", (code, key) => {
  if (code === "\r") terminal.lastEnterTime = Date.now();
  else terminal.lastWriteTime = Date.now();
});
terminalInterface.prompt();
terminalInterface
  .on("line", (line) => {
    setTimeout(
      async (l) => {
        terminal.command += `${l}\n`;
        if (
          terminal.lastEnterTime - terminal.lastWriteTime >
          terminal.delayForWrite
        ) {
          terminal.command = terminal.command.replace(/\n$/gi, "");
          if (terminal.command !== "") {
            terminal.commandsHistory = terminal.commandsHistory.slice(
              terminal.commandsHistory.length - historySize - 1
            );
            terminal.commandsHistory.unshift(terminal.command);
          }
          try {
            const _result = await evalInContext.call(global, terminal.command);
            // if (typeof _result !== "undefined") console.log(_result);
          } catch (err) {
            if (err instanceof TypeError) console.error(err.message);
            else console.error(err);
          }
          terminal.command = "";
        }
        terminalInterface.prompt();
      },
      0,
      line
    );
    return;
  })
  .on("close", () => {
    console.log(servicename + " disconnected!");
    process.exit(0);
  });
