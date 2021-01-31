const axios = require("axios");

const IAM_TOKEN =
  "t1.9euelZrKj8rMk4nPyIzPlZKclJTOk-3rnpWaloycnpuOi4-diZLGkpmNz5Pl8_d0YiR_-e83QUls_N3z9zQRIn_57zdBSWz8.XkvP-1Pwnvagdtj-YJAx8DEHg-jWyHbfoOzMy-EpAWjLfOE1mmRxyDchKZ-S9NWn1NZQKt01SyjJlAsi2XFBAw";
const FOLDER = "b1gq95c232j53fcl1hvg";

translate = function (texts, language_code) {
  return axios({
    method: "post",
    baseURL: "https://translate.api.cloud.yandex.net",
    url: "/translate/v2/translate/",
    headers: {
      "Content-Type": "aaplication/json",
      Authorization: "Bearer " + IAM_TOKEN,
    },
    data: {
      folder_id: FOLDER,
      texts: texts,
      targetLanguageCode: language_code,
    },
  });
};

exports.translate = translate;
