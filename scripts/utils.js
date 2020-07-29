const fetch = require('node-fetch');
const OWNER = 'cpgruber';
const REPO = 'taco-forecast';
const TOKEN = process.env.TOKEN;

const FROZEN = {
  state: 'failure',
  context: 'Are merges open?',
  description: 'NO'
};

const THAWED = {
  state: 'success',
  context: 'Are merges open?',
  description: 'YES'
};

const POST = (url, body) => {
  const cb = res => res.json();
  const headers = {
    authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json'
  };
  return fetch(url, { method: 'POST', headers, body }).then(cb);
};

const GET = (url) => {
  const cb = res => res.json();
  const headers = { authorization: `Bearer ${TOKEN}` };
  return fetch(url, { headers }).then(cb);
};

const updatePulls = async (which = 'BLOCKED') => {
  try {
    const pulls = await GET(`https://api.github.com/repos/${OWNER}/${REPO}/pulls`);
    const body = which === 'BLOCKED' ? FROZEN : THAWED;
    const callback = sha => POST(`https://api.github.com/repos/${OWNER}/${REPO}/statuses/${sha}`, JSON.stringify(body));
    pulls.map(r => r.head.sha).forEach(callback);
  } catch (err) {
    console.log(err);
  }
};

module.exports = updatePulls;
