const express = require("express");
const propertyRouter = express.Router();
const bcryptjs = require("bcryptjs");
const User = require("../models/User.model");
const Property = require("../models/Property.model");
//const uploader = require("../configs/cloudinary-setup.config");

// GET ALL PROPERTIES FOR THE USER
propertyRouter.get("/", (req, res, next) => {
  User.findById(req.session.user._id)
    .populate("properties")
    .then((user) => {
      // console.log(user);
      res.status(200).json(user.properties);
    })
    .catch((err) => {
      res.status(400).json({ message: "No user found" });
    });
});

// ADD A PROPERTY
propertyRouter.post("/create", (req, res, next) => {
  const { title, description, acquisitionDate, type } = req.body;
  if (!req.session.user) {
    res.status(400).json({
      message: "Please login before access the add a property",
    });
    return;
  }

  User.findById(req.session.user._id)
    .populate("properties")
    .then((user) => {
      Property.create({
        title,
        description,
        acquisitionDate,
        type,
      })
        .then((property) => {
          user.properties.push(property);
          user
            .save()
            .then((user) => {
              res.status(200).json({ message: "Property added", user });
            })
            .catch((err) => {
              res.status(400).json({ message: "Property not added" });
            });
        })
        .catch(next);
    })
    .catch((err) => {
      res.status(400).json({ message: "Can't create your property" });
    });
});

// EDIT A PROPERTY
propertyRouter.put("/edit/:id", (req, res, next) => {
  const id = req.params.id;
  const { title, description, acquisitionDate, type } = req.body;
  if (!req.session.user) {
    res.status(400).json({
      message: "Please login before access the add a property",
    });
    return;
  }

  if (!title || !description || !acquisitionDate || !type) {
    res.status(400).json({ message: "Please fill in all the fields" });
    return;
  }

  Property.findOneAndUpdate(
    id,
    {
      title,
      description,
      acquisitionDate,
      type,
    },
    { new: true }
  )
    .then((property) => {
      res.status(200).json({ message: "Property updated", property });
    })
    .catch((err) => {
      res.status(400).json({ message: "Property not updated" });
    });
});

// GET ONE PROPERTY
propertyRouter.get("/:id", (req, res, next) => {
  const id = req.params.id;
  User.findById(req.session.user._id)
    .populate("properties")
    .then((user) => {
      Property.findById(req.params.id)
        .then((property) => {
          res.status(200).json(property);
        })
        .catch((err) => {
          res.status(400).json({ message: "No property found" });
        });
    })
    .catch((err) => {
      res.status(400).json({ message: "No user found" });
    });
});

// GET ALL MOMENTS OF A PROPERTY
propertyRouter.get("/:id/moments", (req, res, next) => {
  const id = req.params.id;
  Property.findById(id)
    .populate("moments")
    .then((property) => {
      res.status(200).json(property.moments);
    })
    .catch((err) => {
      res.status(400).json({ message: "No property found" });
    });
});

// // ADD A MOMENT TO A PROPERTY
// propertyRouter.post("/:id/new-moment", (req, res, next) => {
//   const id = req.params.id;
//   const { name, description, categories, types } = req.body;
//   if (!name || !description || !categories || !types) {
//     res.status(400).json({ message: "Please fill in all the fields" });
//     return;
//   }

//   // Objet moment à insérer
//   const moment = {
//     name: name,
//     description: description,
//     categories: categories,
//     types: types,
//   };

//   // Permet de recherche une propriété et d'y ajouter un moment (push d'un objet)
//   Property.findOneAndUpdate(
//     { _id: id },
//     // $push or $addToSet (peut gérer l'unicité à voir ?)
//     { $addToSet: { moments: moment } },
//     // new:true pour renvoyer le nouvel objet + upsert:true pour creates a new document when no document matches the query criteria
//     { new: true, upsert: true }
//   )
//     .then((property) => {
//       res.status(200).json({ message: "Moment added" });
//       console.log("Property after creating moment", property);
//     })
//     .catch((err) => {
//       if (err) {
//         return res.status(500).send(err);
//       }
//       if (!data) {
//         return res.status(404).end();
//       } else {
//         res.status(400).json({ message: "Moment not added" });
//       }
//     });
//   // Property.findById(id)
//   //   .then((property) => {
//   //     console.log("Found property", property);
//   //     property.moments.push(moment);
//   //     console.log("property.moments", property.moments);
//   //     property.markModified("moments");
//   //     property
//   //       .save()
//   //       .then((property) => {
//   //         console.log("property after save", property);
//   //         res.status(200).json({ message: "Moment added" });
//   //       })
//   //       .catch((err) => {
//   //         res.status(400).json({ message: "Moment not added" });
//   //       });
//   //   })
//   // .catch((err) => {
//   //   res.status(400).json({ message: "No user found" });
//   // });
// });

// // EDIT A MOMENT OF A PROPERTY
// propertyRouter.put("/:id/edit/:momentId", (req, res, next) => {
//   const propertyId = req.params.id;
//   const momentId = req.params.momentId;
//   const { name, description, categories, types } = req.body;
//   if (!name || !description || !categories || !types) {
//     res.status(400).json({ message: "Please fill in all the fields" });
//     return;
//   }

//   // Objet moment à insérer
//   const moment = {
//     name: name,
//     description: description,
//     categories: categories,
//     types: types,
//   };

//   Property.findOneAndUpdate(
//     { _id: propertyId },
//     // $set permet d'update le sub-document
//     { $push: { "property.moments.id(momentId)": moment } },
//     { new: true, upsert: true }
//   )
//     .then((property) => {
//       var subdoc = property.moments.id(momentId);
//       console.log("moments updated", subdoc);
//       res.status(200).json({ message: "Moment updated" });
//       console.log("Property after edit moment", property);
//     })
//     .catch((err) => {
//       res.status(400).json({ message: "Moment not updated" });
//     });
// });

module.exports = propertyRouter;
