const express = require("express");
const {
  CreateAppoinments,
  UsersAppoinments,
  UpdateAppoinmnts,
  DeletesAppoinments
} = require("../Controllers/Appoinments.controllers");
const { isAuth } = require("../common/Common");
const router = express.Router();
router
  .post("/appoinment/create",isAuth, CreateAppoinments)
  .get("/appoinment/getusersappoinment",isAuth, UsersAppoinments)
  .patch("/appoinment/update/:id",isAuth, UpdateAppoinmnts)
  .delete("/appoinment/delete/:id",isAuth,DeletesAppoinments)
  ;

exports.router = router;
