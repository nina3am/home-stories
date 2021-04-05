const express = require("express");
const momentRouter = express.Router();
const bcryptjs = require("bcryptjs");
const User = require("../models/User.model");
const Property = require("../models/Property.model");
const Moment = require("../models/Moment.model");
//const uploader = require("../configs/cloudinary-setup.config");

//ADD A MOMENT TO A PROPERTY
momentRouter.post("/:id/new", (req, res, next) => {
  const id = req.params.id;
  const { name, description, categories, types } = req.body;
  if (!name || !description || !categories || !types) {
    res.status(400).json({ message: "Please fill in all the fields" });
    return;
  }

  // Objet moment à insérer
  const moment = {
    name: name,
    description: description,
    categories: categories,
    types: types,
  };

  Property.findById(id)
    .populate("moments")
    .then((property) => {
      Moment.create(moment)
        .then((moment) => {
          property.moments.push(moment);
          property
            .save()
            .then((property) => {
              res.status(200).json({ message: "Moment added" });
            })
            .catch((err) => {
              res.status(400).json({ message: "Moment not added" });
            });
        })
        .catch(next);
    })
    .catch((err) => {
      res.status(400).json({ message: "Can't create your moment" });
    });
});

// EDIT A MOMENT OF A PROPERTY
momentRouter.put("/edit/:id", (req, res, next) => {
  const id = req.params.id;
  const { name, description, categories, types } = req.body;
  if (!name || !description || !categories || !types) {
    res.status(400).json({ message: "Please fill in all the fields" });
    return;
  }

  // Objet moment à insérer
  const moment = {
    name: name,
    description: description,
    categories: categories,
    types: types,
  };

  Moment.findOneAndUpdate(id, moment, { new: true })
    .then((moment) => {
      res.status(200).json({ message: "Moment updated", moment });
    })
    .catch((err) => {
      res.status(400).json({ message: "Moment not updated" });
    });
});

// GET ONE MOMENT
// momentRouter.get("/:id", (req, res, next) => {
//   const id = req.params.id;
//   User.findById(req.session.user._id)
//     .populate("properties")
//     .then((user) => {
//       Property.findById(req.params.id)
//         .then((property) => {
//           res.status(200).json(property);
//         })
//         .catch((err) => {
//           res.status(400).json({ message: "No property found" });
//         });
//     })
//     .catch((err) => {
//       res.status(400).json({ message: "No user found" });
//     });
// });

module.exports = momentRouter;
