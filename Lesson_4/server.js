const express = require("express");
const path = require("path");

const templating = require("consolidate");
const cookieParser = require("cookie-parser");
const handlebars = require("handlebars");
templating.requires.handlebars = handlebars;

const news_request = require("./news_request.js");
const cons = require("consolidate");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.engine("hbs", templating.handlebars);
app.set("views", "./views");
app.set("view engine", "hbs");

handlebars.registerHelper(
  "selectedNewsType",
  function (cookieValue, currentNewsType) {
    return cookieValue && cookieValue === currentNewsType;
  }
);

const newsRouter = express.Router();
app.use("/news", newsRouter);
newsRouter.get("/", (req, res) => {
  let params = req.cookies;
  params.news_types = news_request.newsTypes;
  res.render("newsIndex", params);
});

newsRouter.post("/selected", (req, res) => {
  let params = req.body;
  
  res.cookie("newsRequestParams", params);
  renderNews(res, params);
});

async function renderNews(res, params) {
  let newsType = params.news_type;

  let result = await news_request.getNews(newsType);
  if (!result) {
    res.status(500).render("selectedNews", {
      error: "При получении новостей произошла ошибка",
    });
  } else {
    res.render("selectedNews", result);
  }
}

app.listen(3000, () => console.log("Listening on port 3000"));
