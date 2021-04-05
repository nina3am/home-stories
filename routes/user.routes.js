const express = require("express");
const userRouter = express.Router();
const bcryptjs = require("bcryptjs");
const User = require("../models/User.model");
//const uploader = require("../configs/cloudinary-setup.config");

// GET PROFILE USER + PROPERTIES
userRouter.get("/", (req, res, next) => {
  if (!req.session.user) {
    res.status(400).json({
      message: "Please login before access the user profile",
    });
    return;
  }

  User.findById(req.session.user._id)
    .populate("properties")
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json({ message: "No user found" });
    });
});

//  EDIT USER PROFILE
userRouter.put("/", (req, res, next) => {
  if (!req.session.user) {
    res.status(400).json({
      message: "Please login before access the user profile",
    });
    return;
  }
  const { firstname, lastname, email, password } = req.body;

  if (password.length < 3) {
    res.status(400).json({
      message:
        "Please make your password at least 8 characters long for security purposes.",
    });
    return;
  }

  let hashPass;

  if (password === req.session.user.password) {
    hashPass = req.session.user.password;
  } else {
    const salt = bcryptjs.genSaltSync(10);
    hashPass = bcryptjs.hashSync(password, salt);
  }

  let updateUser = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: hashPass,
    //avatar: avatar,
  };

  User.findOneAndUpdate(req.session.user.id, updateUser, { new: true })
    .then((user) => {
      console.log(updateUser);
      res.status(200).json(user);
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = userRouter;
