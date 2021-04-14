const express = require("express");
const app = express();
const userRouter = require("./api/user");
const employeeRouter = require("./api/employee");
const bodyParser = require("body-parser");
const passport = require("passport");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
require("./util/passport")(passport);

app.use("/api/user", userRouter);
app.use("/api/employee", employeeRouter);

app.listen(3000, () => {
  console.log(`server on port 3000`);
});
