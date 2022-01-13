const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

// Connection to mongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DBConnection successfull! ");
  })

  .catch((err) => {
    console.log(err);
  });

// use routes
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

app.listen(5000, () => {
  console.log("Backend srrver is running ");
});
