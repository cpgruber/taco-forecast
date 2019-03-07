const { getGif } = require('../utils/gifs');
const { getDay, days } = require('../utils/days');

var express = require('express');
var router = express.Router();

const formatResponse = (res, val) => {
  let day = getDay();
  let isItToday = day === val;
  let title = 'tacos?';
  let response = isItToday ? 'tacos! 🌮' : 'no tacos. 😭';
  let backgroundUrl = isItToday ? getGif('happy') : getGif('sad');
  res.render('index', { title, response, backgroundUrl });
};

/* GET home page. */
router.get('/', function (req, res, next) {
  let day = getDay();
  res.redirect(`/${day}`);
});

days.forEach(day => {
  router.get(`/${day}`, (req, res, next) => {
    return formatResponse(res, day);
  });
});

module.exports = router;
