const router = require("express").Router();
const User = require("../models/User");
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
// REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: cryptoJs.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    // console.log(savedUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    // user && res.status(401).send(" Wrong Credentials!! ");
    if (!user) {
      return res.status(401).send(" Wrong Credentials!! ");
    }

    const hashedPassword = cryptoJs.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPass = hashedPassword.toString(cryptoJs.enc.Utf8);
    if (originalPass !== req.body.password) {
      return res.status(401).send(" Wrong Credentials!! ");
    }
    // originalPass !== req.body.password &&
    //   res.status(401).send(" Wrong Credentials!! ");

    const accessToken = jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
