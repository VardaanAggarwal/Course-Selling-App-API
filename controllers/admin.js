const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const Course = require("../models/Course");
const handleAdminSignUp = async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });

  if (admin) {
    res.status(403).json({ message: "Admin already exists" });
  } else {
    const obj = { username: username, password: password };
    const newAdmin = new Admin(obj);
    await newAdmin.save();
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Admin created successfully", token: token });
  }
};

const handleAdminLogIn = async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token: token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
};

const handleAdminCourses = async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json({ message: "Course created successfully", courseId: course.id });
};

const handleUpdateAdminCourse = async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {
    new: true,
  });
  if (course) {
    res.json({ message: "Course updated successfully" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
};

const handleGetAdminCourses = async (req, res) => {
  const courses = await Course.find({});
  return res.json({ courses });
};

const handleMeRoute = (req, res) => {
  return res.json({
    username: req.user.username,
  });
};

module.exports = {
  handleAdminSignUp,
  handleGetAdminCourses,
  handleUpdateAdminCourse,
  handleAdminLogIn,
  handleAdminCourses,
  handleMeRoute,
};
