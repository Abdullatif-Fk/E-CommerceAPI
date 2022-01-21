const express = require("express");
var bparser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRouter = require("./routes/stripe");
const cors = require("cors");
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
app.use(cors());
app.use(bparser.json());
// app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRouter);

app.listen(5000, () => {
  console.log("Backend srrver is running ");
});
