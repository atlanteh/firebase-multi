#!/usr/bin/env node
const {ArgumentParser, Const} = require('argparse');
const crossEnv = require('cross-env');
const Configstore = require('configstore');
const packageJson = require('./package.json');

const store = new Configstore(packageJson.name, {projects: {}, version: 1});

const parser = new ArgumentParser({
    version: packageJson.version,
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
    const token = store.get(`projects.${project}`);
    if (token) {
        console.log(token);
    } else {
        console.error(`Error: No token for project ${project}`)
        process.exit(1);
    }
}

function invokeSet() {
    store.set(`projects.${project}`, token)
}

function invokeUnset() {
    store.delete(`projects.${project}`)
}

function invokeUse() {
    const token = process.env.FIREBASE_TOKEN || store.get(`projects.${project}`);
    if (!token) {
        console.error(`Error: No token for project ${project}. Use command 'firebase-multi set <project> <token>'`)
        process.exit(1);
    }

    const commandArray = process.argv.slice(4);
    const crossCommand = [`FIREBASE_TOKEN=${token}`].concat(commandArray)
    crossEnv(crossCommand)
}
