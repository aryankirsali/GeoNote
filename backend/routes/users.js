const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//register

router.post("/register", async (req, res) => {
  const newUser = new User(req.body);
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user._id);
  } catch (err) {
    res.status(500).json(err);
  }
});

//login

router.post("/login", async (req, res) => {
  try {
    //find user
    const user = await User.findOne({
      username: req.body.username,
    });
    !user && res.status(400).json("Wrong credentials");

    //validate password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("Wrong credentials");

    //send res
    res.status(200).json({ _id: user._id, username: user.username });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all users
router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
    console.log(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//export

module.exports = router;
