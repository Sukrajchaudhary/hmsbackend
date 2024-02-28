require("dotenv").config();
const { ConnectToDb } = require("./Db/Db.connection");
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userauthRouter = require("./Routes/Users.auth.routes");
const userRouter = require("./Routes/User.routes");
const doctorRouter = require("./Routes/Doctors.routes");
const appoinmentRouter = require("./Routes/Appoinments.routes");
const adminRouter=require('./Routes/Admin.routes')
const bodyParser = require("body-parser");
const session = require("express-session");
// Corrected import
const { isAuth } = require("./common/Common.js");

// Middleware setup
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());
app.use(bodyParser.json({ limit: "200mb" }));
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    exposedHeaders:['X-Total-Count']
  })
);
app.use("/api", userauthRouter.router);
app.use("/api",isAuth, doctorRouter.router);
app.use("/api",adminRouter.router)
app.use("/api",isAuth, appoinmentRouter.router);
app.use("/api",isAuth, userRouter.router);
// Connect to the database and start the server
ConnectToDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`App is running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error.message);
  });
