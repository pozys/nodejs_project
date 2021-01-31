const express = require("express");
const app = express();
const yandex = require("./yandex.js");

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/translate", (req, res) => {
  let params = req.body;
  let texts = params.text.split("\r\n");
  texts = texts.filter(Boolean); // удаление пустых строк
  let axios = yandex.translate(texts, params.language_code);

  axios
    .then(function (result) {
      let translations = result.data.translations.map(
        (item) => `<p>${item.text}</p>`
      );
      translations = translations.join("");
      res.send(translations);
    })
    .catch(function (err) {
      console.log(err.message);
      res.send("Не удалось выполнить перевод");
    });
});

app.listen(3000, () => console.log("Listening on port 3000"));
