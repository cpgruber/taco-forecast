const fetch = require('node-fetch');
const OWNER = 'cpgruber';
const REPO = 'taco-forecast';
const TOKEN = process.env.TOKEN || '310de6009bbb2248119e931e235f5eddf4de4c4c';
const ISSUE_NUMBER = 4;

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
    const callback = sha => updatePull(sha, which);
    pulls.map(r => r.head.sha).forEach(callback);
  } catch (err) {
    console.log(err);
  }
};

const updatePull = (sha, which) => {
  const body = which === 'BLOCKED' ? FROZEN : THAWED;
  return POST(`https://api.github.com/repos/${OWNER}/${REPO}/statuses/${sha}`, JSON.stringify(body));
};

const getComments = () => {
  return new Promise(async (resolve, reject) => {
    let page = 1;
    const comments = [];
    while (page > 0) {
      const res = await GET(`https://api.github.com/repos/${OWNER}/${REPO}/issues/${ISSUE_NUMBER}/comments?per_page=1&page=${page}`);
      if (res.length) {
        comments.push(...res);
        page++;
      } else {
        page = -1;
        resolve(comments);
      }
    }
  });
};

const getCurrentStatus = async () => {
  let status = 'OPEN';
  const comments = await getComments();
  const statusRegex = /^(BLOCKED|OPEN)/;
  const lastStatus = comments.reverse().find(comment => statusRegex.test(comment.body));
  if (lastStatus) {
    status = lastStatus.body.match(statusRegex)[0];
  }
  return status;
};

const setStatus = async sha => {
  const currentStatus = await getCurrentStatus;
  return updatePull(sha, currentStatus);
};

module.exports = { updatePulls, setStatus };
