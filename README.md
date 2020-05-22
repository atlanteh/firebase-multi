firebase-multi
========

Firebase CLI multiple login helper. Supports running multiple projects of different accounts from the same machine, leveraging `firebase login:ci`

**NOTE: This module will have direct access to your Firebase API Token.**

For a _safer_ installtion can be achieved by using a git url, after you've reviewed the code.
- v0.1.2 :: 0154b2c9b902fc89868b63b6e953390a97b6139e :: https://github.com/atlanteh/firebase-multi/tree/0154b2c9b902fc89868b63b6e953390a97b6139e)
- v0.1.1 :: f63613168b52b5914ffc60288af089239b80e6e1 :: https://github.com/atlanteh/firebase-multi/commit/f63613168b52b5914ffc60288af089239b80e6e1

To install the trusted commit:
```
# "<commit-hash>" would be replaced with the 12 alpha-numeric hash
npm i -g https://github.com/atlanteh/firebase-multi.git#<commit-hash>
```

Usage
-------

1. Install this module globally using the **safe approach, described above**. Alternatively, by running `yarn add -g firebase-multi` or `npm i -g firebase-multi`.
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

