const axios = require("axios");
const cheerio = require("cheerio");
const chalk = require("chalk");

axios
  .get("https://ria.ru/")
  .then(function (response) {
    let html = response.data;
    let $ = cheerio.load(html, null, false);

    $(".cell__title-text-valign").each(function (i, element) {
      let sectionName = $(this).text();
      console.log(chalk.red(sectionName));

      let context = $(this).parents(".floor__cell-content");
      $(".cell-list__item-title", context).each(function (i, element) {
        let newsTitle = $(this).text();
        console.log(newsTitle);
      });

      console.log("-----------------------");
    });
  })
  .catch(function (error) {
    console.log(error.message);
  });
