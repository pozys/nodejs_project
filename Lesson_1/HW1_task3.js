const log = console.log;
const dayjs = require('dayjs');
const chalk = require('chalk');

log(chalk.underline('Today is:'))
log(chalk.bold('year - ') + chalk.red(dayjs().format('YYYY')));
log(chalk.bold('month - ')  + chalk.yellowBright(dayjs().format('M')));
log(chalk.bold('day - ')  + chalk.green(dayjs().format('D, dddd')));

 
