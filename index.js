const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

// Admin Authentication
const adminAuthentication = (req, res, next) => {
  const { username, password } = req.headers;
  if (ADMINS.find((a) => a.username === username && a.password === password)) {
    next();
  } else {
    return res.json({ message: "Unauthorized" });
  }
};

// User Authentication

const userAuthentication = (req, res, next) => {
  const { username, password } = req.headers;
  if (USERS.find((a) => a.username === username && a.password === password)) {
    req.user = USERS.find((a) => a.username === username);
    next();
  } else {
    return res.json({ message: "Unauthorized" });
  }
};

// Admin routes
app.post("/admin/signup", (req, res) => {
  // logic to sign up admin
  const { username, password } = req.body;
  if (ADMINS.find((a) => a.username === username)) {
    return res.json({ message: "Admin already exists." });
  } else {
    ADMINS.push({ username, password });
    return res.json({ message: "Admin created successfully" });
  }
});

app.listen(PORT, () => {
  console.log("Server is listening on port 3000");
});
