#!/usr/bin/env node

const ISSUE = 4;
const TRIGGER = parseInt(process.env.ISSUE, 10)
const BODY = process.env.BODY || '';
const parsed = BODY.match(/^(OPEN|BLOCKED)/);
const which = parsed && parsed[0];
if (TRIGGER === ISSUE && which) {
  console.log(which);
}
