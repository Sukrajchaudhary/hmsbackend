const multer = require("multer");
const express = require("express");
const {
  UpdateProfile,
  getUserInfo,
} = require("../Controllers/Users.controllers");
const { isAuth } = require("../common/Common");
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, fieldname: "myimage" });
router.post("/updateprofile",isAuth, upload.single("myimage"), UpdateProfile)
.get("/user/profile",isAuth, getUserInfo);


exports.router = router;
