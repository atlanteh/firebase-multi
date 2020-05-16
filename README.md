firebase-multi
========

Firebase CLI multiple login helper. Supports running multiple projects of different accounts from the same machine, leveraging `firebase login:ci`


Usage
-------

1. Install this module globally by running `yarn add -g firebase-multi` or `npm i -g firebase-multi`
2. Run `firebase login:ci` and complete login flow until you get the firebase ci token in your terminal.
3. Run `firebase-multi set <your-project> <firebase-ci-token>`
4. Run in terminal/package.json script: `firebase-multi use <your-project> firebase deploy`

Supported Commands
-------
`set <firebase-project> <ci token>` - Saves the specified token for the specified firebase-project
`get <firebase-project>` - Prints the token for the specified firebase-project
`use <firebase-project> <command>` - set FIREBASE_TOKEN env with the project token and run the command. If FIREBASE_TOKEN is already set, this command won't override it.
`unset <firebase-project>` - deletes the stored token for the specified project.

License
-------
Copyright (c) 2020 [Roi Nagar](https://github.com/atlanteh).
Released under the MIT license. See [LICENSE](https://github.com/atlanteh/firebase-multi/blob/master/LICENSE) for details.

