const log = console.log;
const dayjs = require('dayjs');

log(dayjs().format('[year -] YYYY'));
log(dayjs().format('[month -] M'));
log(dayjs().format('[day -] D, dddd'));

const myBirthDay = dayjs('1985-10-01');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
log(dayjs().from(myBirthDay));