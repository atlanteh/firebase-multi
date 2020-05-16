#!/usr/bin/env node
const {ArgumentParser, Const} = require('argparse');
const os = require('os');
const path = require('path');
const fs = require('fs');
const crossEnv = require('cross-env');

const storeLocation = path.normalize(os.homedir() + '/.config/configstore/multi-login.json');

const parser = new ArgumentParser({
    version: '0.0.1',
    addHelp: true,
    prog: 'firebase-multi',
    description: 'firebase-multi supports running multiple projects from multiple accounts on one machine, leveraging `firebase login:ci`',
});

const subparsers = parser.addSubparsers({
    set: 'Add/Update project',
    get: 'Print token for project',
    use: 'Invoke a command with project token',
    dest: 'action',
})

const setParser = subparsers.addParser('set', {addHelp: true, description: 'Add or update a ci token to be used for a specific project'})
setParser.addArgument('project', {help: 'The firebase project'})
setParser.addArgument('token', {help: 'The ci token obtained from `firebase login:ci`'})

const getParser = subparsers.addParser('get', {addHelp: true, description: 'Print the stored ci token for the specified project'})
getParser.addArgument('project', {help: 'The firebase project'})

const unsetParser = subparsers.addParser('unset', {addHelp: true, description: 'Remove the stored ci token for the specified project'})
unsetParser.addArgument('project', {help: 'The firebase project'})

const useParser = subparsers.addParser('use', {addHelp: true, description: 'Set FIREBASE_TOKEN env param with the stored ci token, and run the specified command'})
useParser.addArgument('project', {help: 'The firebase project'})
useParser.addArgument('command', {nargs: Const.REMAINDER, help: 'Command to run after FIREBASE_TOKEN env param set'})


const {project, token, action} = parser.parseArgs();

let store = {projects: {}, version: 1};
if (fs.existsSync(storeLocation)) {
    const str = fs.readFileSync(storeLocation, 'utf8');
    store = JSON.parse(str);
}

switch (action) {
case 'get':
    invokeGet();
    break;
case 'set':
    invokeSet();
    break;
case 'unset':
    invokeUnset();
    break;
case 'use':
    invokeUse();
    break;
default:
    console.error('Error: unknown command');
    process.exit(1);
}

function invokeGet() {
    const token = store.projects[project];
    if (token) {
        console.log(token);
    } else {
        console.error(`Error: No token for project ${project}`)
        process.exit(1);
    }
}

function invokeSet() {
    store.projects[project] = token;
    fs.writeFileSync(storeLocation, JSON.stringify(store, null, 2), 'utf8')
}

function invokeUnset() {
    delete store.projects[project];
    fs.writeFileSync(storeLocation, JSON.stringify(store, null, 2), 'utf8')
}

function invokeUse() {
    const token = process.env.FIREBASE_TOKEN || store.projects[project];
    if (!token) {
        console.error(`Error: No token for project ${project}. Use command 'firebase-multi set <project> <token>'`)
        process.exit(1);
    }

    const commandArray = process.argv.slice(4);
    const crossCommand = [`FIREBASE_TOKEN=${token}`].concat(commandArray)
    crossEnv(crossCommand)
}
