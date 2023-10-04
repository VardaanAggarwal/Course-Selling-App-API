const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  imageLink: {
    type: String,
  },
  published: {
    type: Boolean,
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
