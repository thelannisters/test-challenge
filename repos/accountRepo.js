const db = require("../util/db");

exports.loadUserById = (userID) => {
  var sql = `select * from users where id = '${userID}'`;
  return db.load(sql);
};

exports.loadUserByUsername = (username) => {
  var sql = `select * from users where username = '${username}'`;
  return db.load(sql);
};

exports.addUser = (user) => {
  var sql = `insert into users(username, hash, salt) values('${user.username}', '${user.hash}', '${user.salt}')`;
  return db.save(sql);
};

exports.getAllEmployees = () => {
  var sql = `select * from employees`;
  return db.load(sql);
};
