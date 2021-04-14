CREATE DATABASE IF NOT EXISTS techbase;

use techbase;

CREATE TABLE users(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  hash VARCHAR(500) NOT NULL,
  salt VARCHAR(500) NOT NULL
);

CREATE TABLE employees (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  role VARCHAR(50)
);

CREATE TABLE department(
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE team(
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    departmentId INT UNSIGNED NULL
);

CREATE TABLE employees_team(
	employees_id INT UNSIGNED,
    team_id INT UNSIGNED,
    PRIMARY KEY (employees_id, team_id)
);

ALTER TABLE team
ADD FOREIGN KEY (departmentId) REFERENCES department(id);

ALTER TABLE employees_team 
ADD FOREIGN KEY (employees_id) REFERENCES employees(id);

ALTER TABLE employees_team 
ADD FOREIGN KEY (team_id) REFERENCES team(id);
