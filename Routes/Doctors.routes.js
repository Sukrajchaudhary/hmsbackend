const express = require("express");
const {
  CreateDoctors,
  LoginDoctors,
  getDoctor,
  getallDoctors,
} = require("../Controllers/Doctors.auth.controllers");
const { isAuth } = require("../common/Common");
const router = express.Router();
router
  .post("/doctor/register",isAuth, CreateDoctors)
  .post("/doctor/Login",isAuth, LoginDoctors)
  .get("/doctor/:id", isAuth,getDoctor)
  .get("/doctor",isAuth, getallDoctors);

exports.router = router;
