# firebase-admin-cli

Command Line Interface with admin rights for Firebase.Auth, Firebase.Firestore, Firebase.Storage

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
