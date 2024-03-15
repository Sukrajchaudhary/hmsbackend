const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  GetAllUsersAppoinments,
} = require("../Controllers/Admin.controller");
const { isAuth } =require("../common/Common");
router
  .get("/admin/allappoinments",isAuth, GetAllUsersAppoinments)
exports.router = router;
