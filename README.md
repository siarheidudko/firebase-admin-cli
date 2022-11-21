# firebase-admin-cli

Command Line Interface with admin rights for Firebase Project (Auth, Realtime Database, Firestore, Storage, etc.).

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
require("../my_migration_script.js").run();
```

```js:my_migration_script.js
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
siarhei@MacBook-Pro firebase-admin-cli % firebase cli

> firebase-admin-cli@1.1.0 start
> node ./bin/firebase-cli.js

The following settings are loaded:
Service Account from file: /Users/siarhei/Projects/firebase-admin-cli/serviceAccount.json
Project id: fir-engine-f1dcd
┌─────────┬──────────┬───────────────────────────────────────────┬──────────────────────────────────────────────────────────┐
│ (index) │ command  │                   title                   │                          alias                           │
├─────────┼──────────┼───────────────────────────────────────────┼──────────────────────────────────────────────────────────┤
│    0    │ 'help()' │            'Сall current help'            │                         'help()'                         │
│    1    │  'auth'  │  'Сall firebase authorization interface'  │                      'admin.auth()'                      │
│    2    │   'db'   │    'Сall firebase firestore interface'    │                   'admin.firestore()'                    │
│    3    │ 'bucket' │ 'Сall firebase storage/bucket interface'  │ 'admin.storage().bucket("fir-engine-f1dcd.appspot.com")' │
│    4    │ 'types'  │ 'Сall firebase firestore types interface' │                    'admin.firestore'                     │
│    5    │ 'exit()' │              'Exit console'               │               'terminalInterface.close()'                │
└─────────┴──────────┴───────────────────────────────────────────┴──────────────────────────────────────────────────────────┘
Firebase Admin CLI (fir-engine-f1dcd)>const users = await db
  .collection('users')
  .get();
console.log('users', users.docs);
Firebase Admin CLI (fir-engine-f1dcd)>
users []
Firebase Admin CLI (fir-engine-f1dcd)>
```
