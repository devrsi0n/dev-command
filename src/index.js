'use strict';

const updateNotifier = require('update-notifier');
const pkg = require('../package.json');

updateNotifier({ pkg }).notify();

module.exports = require('@oclif/command');
