const express = require("express");
const {
  CreateUsers,
  LoginUsers,
  PasswordResetRequest,
  setPassword
} = require("../Controllers/Users.auth.controllers");

const router = express.Router();
router
  .post("/register", CreateUsers)
  .post("/Login", LoginUsers)
  .post("/reset-password-request", PasswordResetRequest)
  .post("/reset-password", setPassword)
 
 

exports.router = router;
