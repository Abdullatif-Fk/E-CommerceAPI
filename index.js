const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/user");
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DBConnection successfull! ");
  })

  .catch((err) => {
    console.log(err);
  });
app.use(express.json());
app.use("/api/user", userRoute);
app.listen(5000, () => {
  console.log("Backend srrver is running ");
});
