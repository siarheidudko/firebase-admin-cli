#!/usr/bin/env node

"use strict";

const { createInterface } = require("readline");
const admin = require("firebase-admin");
const { getProjectInfo } = require("../utils/getProjectInfo");
const { lineHandler } = require("../utils/lineHandler");

const projectInfo = getProjectInfo();

const servicename = `Firebase Admin CLI (${projectInfo.serviceAccount.project_id})`;

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

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: servicename + ">",
});

const exit = () => {
  rl.close();
};
fastcommands.push({
  command: "exit()",
  title: "Exit console",
  alias: "rl.close()",
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
    str = lineHandler.call(this, str, constants, globalKeys);
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
rl.prompt();
rl.on("line", async (line) => {
  try {
    const _result = await evalInContext.call(global, line);
    if (typeof _result !== "undefined") console.log(_result);
  } catch (err) {
    if (err instanceof TypeError) console.error(err.message);
    else console.error(err);
  }
  rl.prompt();
  return;
}).on("close", () => {
  console.log(servicename + " disconnected!");
  process.exit(0);
});
