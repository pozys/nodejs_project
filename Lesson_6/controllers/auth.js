const cons = require("consolidate");
const Cookies = require("cookies");
const passport = require("passport");

const models = require("../models");

const getLoginPage = (req, res, next) => {
  var cookies = new Cookies(req, res);
  let login = cookies.get("login");

  let params = {};
  if (login) {
    params.login = login;
  }

  res.render("login", params);
};

const login = async (req, res, next) => {
  let login = req.body.login;
  const user = await models.User.findByLogin(login);

  if (!user) {
    res.render("login", { message: "Неправильный логин" });
    return;
  }

  if (!user.checkPassword(req.body.password)) {
    res.render("login", { message: "Неправильный пароль" });
    return;
  }

  var cookies = new Cookies(req, res);

  if (req.body.rememberMe) {
    cookies.set("login", login);
  } else {
    cookies.set("login");
  }

  req.session.login = req.body.login;

  res.redirect("/tasks/main");
};

const getSigninPage = async (req, res, next) => {
  res.render("signin");
};

const signin = async (req, res, next) => {
  const user = new models.User();

  user.fill(req.body);
  let result = await user.save();

  if (result) {
    await login(req, res, next);
  } else {
    let params = { message: "Ошибка при создании пользователя" };
    res.render("signin", params);
  }
};

const logout = async (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

const loginByGoogle = async (req, res, next) => {
  console.log('loginByGoogle');
  passport.authenticate("google", { scope: ["https://www.googleapis.com/auth/drive.file"] });
};

const googleCallback = async (req, res, next) => {
  console.log('googleCallback');
  passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
      res.redirect("/");
    };
};

module.exports = {
  getLoginPage,
  login,
  getSigninPage,
  signin,
  logout,
  loginByGoogle,
  googleCallback,
};
