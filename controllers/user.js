const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const Course = require("../models/Course");
const handleUserSignUp = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(403).json({ messsage: "Username or Password not given" });
  }
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "User created successfully", token: token });
  }
};

const handleUserLogIn = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token: token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
};

const handleGetUserCourses = async (req, res) => {
  const courses = await Course.find({ published: true });
  return res.json({ courses });
};

const handleUserPurchaseCourse = async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  console.log(course);
  if (course) {
    const user = await User.findOne({ username: req.user.username });
    if (user) {
      user.purchasedCourses.push(course);
      await user.save();
      res.json({ message: "Course purchased successfully" });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "Course not found" });
  }
};

const handleGetUserPurchasedCourses = async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate(
    "purchasedCourses"
  );
  console.log(user);
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
};

const handleAddCourseToCart = async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  // console.log(course);
  if (course) {
    const user = await User.findOne({ username: req.user.username });
    if (user) {
      user.coursesCart.push(course);
      await user.save();
      res.json({ message: "Course Added To Cart successfully" });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "Course not found" });
  }
};

const handleGetCoursesCart = async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate(
    "coursesCart"
  );
  // console.log(user);
  if (user) {
    res.json({ coursesCart: user.coursesCart || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
};

module.exports = {
  handleUserSignUp,
  handleUserLogIn,
  handleGetUserCourses,
  handleUserPurchaseCourse,
  handleGetUserPurchasedCourses,
  handleAddCourseToCart,
  handleGetCoursesCart,
};
