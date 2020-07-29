#!/usr/bin/env node

const { setStatus } = require('./utils');

const SHA = process.env.SHA;
const TOKEN = process.env.TOKEN;
setStatus(SHA, TOKEN);
