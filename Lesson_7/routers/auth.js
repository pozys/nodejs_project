const express = require("express");
const controllers = require("../controllers");

const router = express.Router();

router.get("/login/", controllers.auth.getLoginPage);
router.post("/login/", controllers.auth.login);
router.get("/logout/", controllers.auth.logout);
router.get("/signin/", controllers.auth.getSigninPage);
router.post("/signin/", controllers.auth.signin);
router.get("/loginByGoogle/", controllers.auth.loginByGoogle);
router.get(
  "/googleCallback/",
  controllers.auth.googleCallback,
  controllers.auth.googleLoggedIn
);

module.exports = router;
