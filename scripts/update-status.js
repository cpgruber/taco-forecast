#!/usr/bin/env node

const { updatePulls } = require('./utils');

const WHICH = process.env.WHICH;
const TOKEN = process.env.TOKEN;
updatePulls(WHICH, TOKEN);
