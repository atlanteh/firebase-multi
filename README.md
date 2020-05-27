firebase-multi
========

Firebase CLI multiple login helper. Supports running multiple projects of different accounts from the same machine, leveraging `firebase login:ci`

**NOTE: This module will have direct access to your Firebase API Token.**

A _safer_ installation can be achieved by using a git url, after you've reviewed the code.
- v0.1.3 :: https://github.com/atlanteh/firebase-multi/tree/v0.1.3

To install the trusted commit:
```
npm i -g atlanteh/firebase-multi0#v0.1.3
# or
yarn global add atlanteh/firebase-multi0#v0.1.3
```

Alternatively you can use npm:
```
npm i -g firebase-multi
# or
yarn global add firebase-multi
```

Usage
-------

1. Run `firebase login:ci` and complete login flow until you get the firebase ci token in your terminal.
2. Run `firebase-multi set <your-project> <firebase-ci-token>`
3. Run in terminal/package.json script: `firebase-multi use <your-project> firebase deploy`

Supported Commands
-------

```
usage: firebase-multi [-h] [-v] {set,get,unset,use} ...

firebase-multi supports running multiple projects from multiple accounts on one machine, leveraging `firebase login:ci`

Optional arguments:
  -h, --help           Show this help message and exit.
  -v, --version        Show program's version number and exit.

Commands:
  set        Add / Update the token for the specified firebase-project
  get        Prints the token for the specified firebase-project
  use        Invoke a command with a project token after setting the FIRE_BASE_TOKEN.
             If FIREBASE_TOKEN is already set, this command won't override it.
  unset      Deletes the stored token for the specified project.

  {set,get,unset,use}
```

License
-------
Copyright (c) 2020 [Roi Nagar](https://github.com/atlanteh).
Released under the MIT license. See [LICENSE](https://github.com/atlanteh/firebase-multi/blob/master/LICENSE) for details.

