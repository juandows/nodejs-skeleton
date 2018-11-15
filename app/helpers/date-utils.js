const moment = require('moment-timezone');

moment.tz.setDefault('Europe/Madrid');

const stringToDate = string => moment(string).toDate();

const dateToDateString = date => moment(date).format('DD-MM-YYYY HH:mm:ss');
const dateToDateString2 = date => moment(date).format('DD-MM-YYYY');
const dateToDateString3 = date => moment(date).format('YYYY-MM-DD');

const datesBetween = (minDateString, maxDateString) => {
  const dates = [];
  const increasingDate = moment(minDateString);
  const maxDate = moment(maxDateString);
  if (increasingDate.isValid() && maxDate.isValid()) {
    while (increasingDate.isSameOrBefore(maxDate)) {
      dates.push(moment(increasingDate).toDate());
      increasingDate.add(1, 'd');
    }
  }
  return dates;
};

module.exports = {
  stringToDate,
  dateToDateString,
  dateToDateString2,
  dateToDateString3,
  datesBetween,
};
