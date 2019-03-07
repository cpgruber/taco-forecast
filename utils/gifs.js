const happy = [
  'https://media.giphy.com/media/PrRVvcwgty7K0/giphy.gif',
  'https://media.giphy.com/media/QnJnixUIJsmMo/giphy.gif',
  'https://media.giphy.com/media/Pw7f9kOfx8iOI/giphy.gif',
  'https://media.giphy.com/media/3o7ZezGPktFNZj93os/giphy.gif',
  'https://media.giphy.com/media/3ohs7YMlUQ6Jk8w0rS/giphy.gif'
];


const sad = [
  'https://media.giphy.com/media/k61nOBRRBMxva/giphy.gif',
  'https://media.giphy.com/media/2rtQMJvhzOnRe/giphy.gif',
  'https://media.giphy.com/media/a9xhxAxaqOfQs/giphy.gif',
  'https://media.giphy.com/media/3OhXBaoR1tVPW/giphy.gif',
  'https://media.giphy.com/media/eIPM3j6YXHKXC/giphy.gif'
];

const lists = { happy, sad};

const getGif = (type) => {
  let list = lists[type];
  let idx = Math.floor(Math.random() * list.length);
  return list[idx];
};

module.exports = { getGif };
