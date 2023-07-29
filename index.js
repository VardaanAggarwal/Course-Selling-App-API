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

app.post("/admin/login", adminAuthentication, (req, res) => {
  // logic to log in admin
  // console.log(ADMINS);
  return res.json({ message: "Login Successful" });
});
app.post("/admin/courses", adminAuthentication, (req, res) => {
  // logic to create a course
  let course = req.body;
  let id = Date.now();
  COURSES.push({ ...course, courseId: id });
  return res.json({ message: "Course created successfully", courseId: id });
});

app.put("/admin/courses/:courseId", adminAuthentication, (req, res) => {
  const courseId = parseInt(req.params.courseId);
  const course = COURSES.find((c) => c.courseId === courseId);
  // console.log(COURSES);
  if (course) {
    Object.assign(course, req.body);
    // console.log(COURSES);
    res.json({ message: "Course updated successfully" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

app.get("/admin/courses", adminAuthentication, (req, res) => {
  // logic to get all courses
  return res.json({ courses: COURSES });
});

app.listen(PORT, () => {
  console.log("Server is listening on port 3000");
});
