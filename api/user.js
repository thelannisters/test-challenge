const express = require("express");
const router = express.Router();
const { genPassword, validPassword, signJwt } = require("../util/password");
const { loadUserByUsername, addUser } = require("../repos/accountRepo");

router.post("/login", (req, res, next) => {
  loadUserByUsername(req.body.username)
    .then((user) => {
      if (!user.length) {
        res.status(200).json({ success: false, msg: "could not find user" });
      }
      const isValid = validPassword(
        req.body.password,
        user[0].hash,
        user[0].salt
      );
      if (isValid) {
        const tokenObject = signJwt(user[0]);
        res.status(200).json({
          success: true,
          token: "Bearer " + tokenObject,
          expiresIn: 3600,
        });
      } else {
        res
          .status(401)
          .json({ success: false, msg: "you entered the wrong password" });
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/register", (req, res) => {
  const saltHash = genPassword(req.body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;
  loadUserByUsername(req.body.username)
    .then((user) => {
      if (!user.length) {
        const newUser = {
          username: req.body.username,
          hash: hash,
          salt: salt,
        };
        addUser(newUser)
          .then((user) => {
            if (user) {
              res
                .status(201)
                .json({ success: false, msg: "Success register new user" });
            }
          })
          .catch((err) => {
            res.status(503).json({ msg: "Error when adding new user" });
          });
      } else {
        res.json({ success: false, msg: "User already exist" });
      }
    })
    .catch((err) => {
      res.status(503).json({ msg: "Error when adding new user" });
    });
});

module.exports = router;
