const express = require("express");
const { authenticateJwt } = require("../middlewares/authenticateJwt");
const {
  handleUserSignUp,
  handleUserLogIn,
  handleGetUserCourses,
  handleUserPurchaseCourse,
  handleGetUserPurchasedCourses,
} = require("../controllers/user.js");
const router = express.Router();
router.post("/signup", handleUserSignUp);

router.post("/login", handleUserLogIn);

router.get("/courses", authenticateJwt, handleGetUserCourses);

router.post("/courses/:courseId", authenticateJwt, handleUserPurchaseCourse);

router.get("/purchasedCourses", authenticateJwt, handleGetUserPurchasedCourses);

module.exports = router;
