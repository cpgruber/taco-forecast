const moment = require('moment-timezone');
const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const getDay = () => {
  return moment().tz('America/New_York').format('dddd').toLowerCase();
};

module.exports = { days, getDay };
