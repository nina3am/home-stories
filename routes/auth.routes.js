const express = require("express");
const authRoutes = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");

// POST SIGNUP (create account)
authRoutes.post("/signup", (req, res, next) => {
  const { firstname, lastname, email, password, avatar } = req.body;
  if (!firstname || !lastname || !email || !password) {
    res.status(400).json({ message: "Merci de remplir tous les champs" });
    return;
  }

  if (password.length < 3) {
    res.status(401).json({
      message: "Votre mot de passe doit contenir au moins 8 caractères",
    });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "L'email est déjà utilisé" });
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const aNewUser = new User({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashPass,
        avatar: avatar,
      });

      aNewUser
        .save()
        .then(() => {
          // Persist our new user into session
          // req.session.user = aNewUser;

          res.status(200).json(aNewUser);
          console.log(aNewUser);
        })
        .catch((err) => {
          console.log("err: ", err);

          res
            .status(400)
            .json({ message: "Saving user to database went wrong." });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: "Email saving went bad." });
    });
});

// POST LOGIN
authRoutes.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.status(400).json({ message: "No user with that email." });
        return next(new Error("No user with that email"));
      }

      // Décrypte mot de passe
      if (bcrypt.compareSync(password, user.password) !== true) {
        res.status(400).json({ message: "Wrong password" });
        return next(new Error("Wrong credentials"));
      } else {
        req.session.user = user;
        console.log(req.session.user);
        //res.json(user);
        res.status(200).json(user);
      }
    })
    .catch(next);
});

// POST LOGOUT
authRoutes.post("/logout", (req, res, next) => {
  req.session.destroy();
  res.json({ message: "You're now logged out." });
});

// GET LOGGEDIN
authRoutes.get("/loggedin", (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (!req.session.user) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  User.findById(req.session.user._id)
    .populate("properties")
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.status(500).json({ message: "erreurr inconnue" }));
});

module.exports = authRoutes;
