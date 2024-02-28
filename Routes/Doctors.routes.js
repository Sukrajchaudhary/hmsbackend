const express = require("express");
const {
  CreateDoctors,
  LoginDoctors,
  getDoctor,
  getallDoctors,
} = require("../Controllers/Doctors.auth.controllers");
const router = express.Router();
router
  .post("/doctor/register", CreateDoctors)
  .post("/doctor/Login", LoginDoctors)
  .get("/doctor/:id", getDoctor)
  .get("/doctor", getallDoctors);

exports.router = router;
