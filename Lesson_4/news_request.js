const axios = require("axios");
const cheerio = require("cheerio");

const newsTypes = { main: "Главное", popular: "Популярное" };

exports.newsTypes = newsTypes;

exports.getNews = async (news_type) => {
  let result = await axios
    .get("https://ria.ru/")
    .then(function (response) {
      let html = response.data;
      let $ = cheerio.load(html, null, false);
      let news = [];
      let newsType = newsTypes[news_type];

      $(".cell__title-text-valign").each(function (i, element) {
        let sectionName = $(this).text();

        if (sectionName !== newsType) {
          let context = $(this).parents(".floor__cell-content");

          $(".cell-list__item-title", context).each(function (i, element) {
            news.push($(this).text());
          });
        }
      });
      let result = { news: news, news_type: newsType };
      
      return result;
    })
    .catch(function (error) {
      console.log(error.message);
      return null;
    });

  return result;
};
