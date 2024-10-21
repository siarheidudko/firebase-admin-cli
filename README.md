# firebase-admin-cli

Empower Your Firebase Project with Ultimate Control: Unleash the Full Potential of Firebase's Auth, Realtime Database, Firestore, Storage, and More, All Through a Powerful Command Line Interface with Admin Privileges!

[![npm](https://img.shields.io/npm/v/firebase-admin-cli.svg)](https://www.npmjs.com/package/firebase-admin-cli)
[![npm](https://img.shields.io/npm/dy/firebase-admin-cli.svg)](https://www.npmjs.com/package/firebase-admin-cli)
[![NpmLicense](https://img.shields.io/npm/l/firebase-admin-cli.svg)](https://www.npmjs.com/package/firebase-admin-cli)
![GitHub last commit](https://img.shields.io/github/last-commit/siarheidudko/firebase-admin-cli.svg)
![GitHub release](https://img.shields.io/github/release/siarheidudko/firebase-admin-cli.svg)

## Install

```bash
npm i firebase-admin-cli -g
```

## Run

```bash
> export GOOGLE_APPLICATION_CREDENTIALS=/FULL_PATH_TO_YOUR_SERVICE_ACCOUNT.json
> firebase-cli
```

## How to use

Just use JavaScript to manage the database.

- You can use one-line commands

```js
console.log(
  await db
    .collection("users")
    .get()
    .then(({ docs }) => docs.map((e) => e.data()))
);
```

```js
const users = await db.collection("users").get();
console.log(users.docs.map((e) => e.data()));
```

- You can insert multi-line scripts

```js
// command 1 (use Ctrl + V to input multiline code)
const users = await db.collection("users").get();
const arr = users.docs.map((e) => e.data());
console.log(arr);
```

- You can assign the result of a command to variables and use them in another command

```js
// command 1
const users = await db.collection("users").get();
```

```js
// command 2
const arr = users.docs.map((e) => e.data());
```

```js
// command 3
console.log(arr);
```

- You can output the result of the command to the console (you can study the structures and utility properties and methods of objects)

```js
console.log(await db.collection("users").get());
```

- You can even execute your script from a file using require();

```js
require("../examples/my_migration_script_test.js").run();
```

my_migration_script_test.js

```js
const admin = require("firebase-admin");

module.exports.run = async () => {
  const users = await admin.firestore().collection("users").get();
  const arr = users.docs.map((e) => e.data());
  console.log(arr);
};
```

## Example

```bash
siarhei@MacBook-Pro firebase-admin-cli % export GOOGLE_APPLICATION_CREDENTIALS=/Users/siarhei/Projects/firebase-admin-cli/serviceAccount.json
siarhei@MacBook-Pro firebase-admin-cli % firebase cli --with=../examples/my_extension.js

> firebase-admin-cli@1.0.0 start
> node ./bin/firebase-cli.js

The following settings are loaded:
Service Account from file: /Users/siarhei/Projects/ireceipt-pro/firebase/functions/accounts/production.json
Project id: ireceipt-pro
Extension is loaded: ../examples/my_extension.js
The following methods are now available to you: ext.printFile
┌─────────┬───────────┬───────────────────────────────────────────┬─────────────────────────────┐
│ (index) │ command   │ title                                     │ alias                       │
├─────────┼───────────┼───────────────────────────────────────────┼─────────────────────────────┤
│ 0       │ 'help()'  │ 'Сall current help'                       │ 'help()'                    │
│ 1       │ 'auth'    │ 'Сall firebase authorization interface'   │ 'admin.auth()'              │
│ 2       │ 'rtdb'    │ 'Сall firebase database interface'        │ 'admin.database()'          │
│ 3       │ 'db'      │ 'Сall firebase firestore interface'       │ 'admin.firestore()'         │
│ 4       │ 'storage' │ 'Сall firebase storage interface'         │ 'admin.storage()'           │
│ 5       │ 'bucket'  │ 'Сall firebase storage/bucket interface'  │ 'admin.storage().bucket()'  │
│ 6       │ 'types'   │ 'Сall firebase firestore types interface' │ 'admin.firestore'           │
│ 7       │ 'exit()'  │ 'Exit console'                            │ 'terminalInterface.close()' │
└─────────┴───────────┴───────────────────────────────────────────┴─────────────────────────────┘
Firebase Admin CLI (ireceipt-pro)>
```

## Extensions

You can create your own extensions for the application and run them inside the console.

If you want to use extensions, just list them using the prefix `--with=`, for example:

```bash
siarhei@MacBook-Pro firebase-admin-cli % firebase cli --with=../examples/my_extension.js --with=../examples/my_extension_2.js --with=../examples/my_extension_3.js
```

After that, you can use the extension commands. For example:

```js
ext.printFile("users/test_file.json")
```

Here is example of the JavaScript extension (also you can use TypeScript):

```js
const { tools } = require("firebase-admin-cli");

/**
 * Print a GCS file data
 *
 * Example `ext.printFile("users/test_file.json");`
 * @param {String} path - file path
 */
const printFile = async (path) => {
  console.log(
    await tools.bucket
      .file(path)
      .download()
      .then(([buf]) => buf.toString())
  );
};

module.exports = { printFile };
```
