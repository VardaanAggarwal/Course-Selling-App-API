require("dotenv").config();
const express = require("express");
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const cors = require("cors");
const app = express();
const { connectToDB } = require("./connection");
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectToDB(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected.");
  })
  .catch((err) => {
    console.log(`MongoDB Error : ${err}`);
  });
app.use("/admin", adminRouter);
app.use("/users", userRouter);
app.listen(3000, () => console.log("Server running on port 3000"));
