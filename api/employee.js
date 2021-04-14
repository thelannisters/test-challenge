const express = require("express");
const router = express.Router();
const passport = require("passport");
const { getAllEmployees } = require("../repos/accountRepo");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    getAllEmployees()
      .then((employees) => {
        res.status(200).json(employees);
      })
      .catch((err) => {
        res.status(503).json({ msg: "Can't get all employees" });
      });
  }
);

module.exports = router;
