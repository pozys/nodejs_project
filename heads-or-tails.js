const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

startNewRound();

function startNewRound() {
  rl.question(
    'Монетка подброшена. Что выпадет?\nОрёл - наберите "О"\nРешка - наберите "Р"\nДля завершения игры наберите "В"\n',
    answerHandler
  );
}

function answerHandler(answer) {
  answer = answer.toLowerCase();
  switch (answer) {
    case coinToss():
      console.log("Вы угадали!");
      addToLog(1);
      break;
    case "в":
      console.log("До новых встреч!");
      rl.close();
      return;
    default:
      addToLog(0);
      console.log("Вы не угадали!");
      break;
  }

  console.log("\n-----------------------");
  startNewRound();
}

function coinToss() {
  return Math.floor(Math.random() * 2) === 0 ? "о" : "р";
}

function addToLog(result) {
  fs.appendFile("game_log.log", result.toString(), 'utf8', function (error) {
    if (error) {
      console.error(error);
    }
  });
}
