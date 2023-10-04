const express = require("express");
const {
  handleAdminSignUp,
  handleAdminLogIn,
  handleAdminCourses,
  handleUpdateAdminCourse,
  handleGetAdminCourses,
  handleMeRoute,
} = require("../controllers/admin.js");
const { authenticateJwt } = require("../middlewares/authenticateJwt.js");
const router = express.Router();

router.post("/signup", handleAdminSignUp);

router.post("/login", handleAdminLogIn);

router.post("/courses", authenticateJwt, handleAdminCourses);

router.put("/courses/:courseId", authenticateJwt, handleUpdateAdminCourse);

router.get("/courses", authenticateJwt, handleGetAdminCourses);

router.get("/me", authenticateJwt, handleMeRoute);
module.exports = router;
