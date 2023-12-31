const express = require("express");
const { authenticateJwt } = require("../middlewares/authenticateJwt");
const {
  handleUserSignUp,
  handleUserLogIn,
  handleGetUserCourses,
  handleUserPurchaseCourse,
  handleGetUserPurchasedCourses,
  handleGetCoursesCart,
  handleAddCourseToCart,
  handlePurchaseCart,
  handleDeleteCartCourse,
} = require("../controllers/user.js");
const router = express.Router();
router.post("/signup", handleUserSignUp);

router.post("/login", handleUserLogIn);

router.get("/courses", authenticateJwt, handleGetUserCourses);

router.post("/courses/:courseId", authenticateJwt, handleUserPurchaseCourse);

router.post("/add/cart/:courseId", authenticateJwt, handleAddCourseToCart);

router.get("/cart", authenticateJwt, handleGetCoursesCart);

router.post("/cart/purchase", authenticateJwt, handlePurchaseCart);

router.get("/purchasedCourses", authenticateJwt, handleGetUserPurchasedCourses);

router.delete(
  "/cart/delete/:courseId",
  authenticateJwt,
  handleDeleteCartCourse
);

module.exports = router;
