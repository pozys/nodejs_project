const fs = require("fs");
const chalk = require('chalk');
const minimist = require("minimist");
let argv = minimist(process.argv.slice(2), {
  alias: {
    file: "f",
  },
});

let logFile = argv.file;
if (!logFile) {
  console.log("Укажите файл логов");
  return;
}

fs.readFile(logFile, "utf8", analize);

function analize(error, data) {
  if (error) {
    console.error(error);
    return;
  }

  let roundCount = data.length;

  let dataArray = data.split("");

  let winMax = 0;
  let lossMax = 0;
  let winInARow = 0;
  let lossInARow = 0;
  let winTotal = 0;

  dataArray.forEach(function (current) {
    let currentNumber = Number(current);

    if (currentNumber === 1) {
      winInARow++;
      lossMax = Math.max(lossMax, lossInARow);
      lossInARow = 0;
    } else {
      lossInARow++;
      winMax = Math.max(winMax, winInARow);
      winInARow = 0;
    }

    winTotal += currentNumber;
  });

  let lossTotal = roundCount - winTotal;
  let winLossRatio = (lossTotal === 0 || roundCount === 0) ? 0 : (winTotal / lossTotal).toFixed(2);

  console.log(`${chalk.black.bold.bgWhiteBright('Анализ партий')}
    Всего партий: ${roundCount}
    Выигрышей: ${winTotal}
    Проигрышей: ${lossTotal}
    Отношение выигрышей к проигрышам: ${winLossRatio}
    Максимальное число выигрышей подряд: ${winMax}
    Максимальное число проигрышей подряд: ${lossMax}`);
}
