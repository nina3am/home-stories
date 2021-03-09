const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertySchema = new Schema(
  {
    title: String,
    description: String,
    image: String,
    type: {
      type: String,
      enum: [
        "maison",
        "appartement",
        "chateau",
        "ferme",
        "terrain",
        "immeuble",
        "voiture",
        "moto",
        "scooter",
        "velo",
        "bateau",
        "avion",
      ],
    },
    owner: [
      {
        userId: [{ type: Schema.Types.ObjectId, ref: "User" }],
        role: { type: String, enum: ["owner", "member"] },
      },
    ],
    moments: [
      {
        name: String,
        description: String,
        images: String,
        documents: String,
        timestamps: {
          createdAt: Number,
          updatedAt: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model("Property", propertySchema);
module.exports = Property;
