const express = require("express");
const router = express.Router();
const User = require("../model/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controller/user.js")

router.get("/sign", (req, res) => {
  res.render("/user/signup.ejs");
});

router.post(
  "/signup",
  wrapAsync(userController.signup)
);

//login form
router.get("/login", userController.loginForm);

router.post(
  "/login",saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login
);

router.get("/logout", userController.logout); 

module.exports = router;
