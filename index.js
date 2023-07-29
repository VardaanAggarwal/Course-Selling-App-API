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

app.listen(PORT, () => {
  console.log("Server is listening on port 3000");
});
