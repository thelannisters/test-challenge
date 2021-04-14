### Run project

# Create database

Use db.sql to create database and then use employee.sql to input employee

# Install package

```
npm install
```

# Run server

```
npm start
```

- Server will run on localhost:3000

# API

- POST localhost:3000/api/user/register : Register new user with body (username/password)
- POST localhost:3000/api/user/login: Login user with body (username/password). After login, copy jwt token and at it to Authorization header
- GET localhost:3000/api/employee/: Get all employee
