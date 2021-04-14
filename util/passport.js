const JwtStategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { loadUserById } = require("../repos/accountRepo");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "Techbase is rock",
};

module.exports = (passport) => {
  passport.use(
    new JwtStategy(options, function (jwt_payload, done) {
      loadUserById(jwt_payload._id)
        .then((user) => {
          if (user.length) {
            return done(null, user[0]);
          } else {
            return done(null, false);
          }
        })
        .catch((err) => {
          return done(err, false);
        });
    })
  );
};
