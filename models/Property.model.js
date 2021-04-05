const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertySchema = new Schema(
  {
    title: String,
    description: String,
    image: String,
    acquisitionDate: String,
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
    moments: [{ type: Schema.Types.ObjectId, ref: "Moment" }],
    // moments: [
    //   {
    //     name: String,
    //     description: String,
    //     images: [String],
    //     categories: [
    //       {
    //         category: { type: String, enum: ["piece", "bâtiment", "éléments"] },
    //         name: { type: String, enum: ["chambre", "SDB", "Salon"] },
    //         taille: String,
    //         photos: [String],
    //       },
    //     ],
    //     types: [
    //       {
    //         type: { type: String, enum: ["travaux", "aménagement", "achat"] },
    //         price: String,
    //         timeSpent: String,
    //         documents: [String],
    //       },
    //     ],
    //     timestamps: {
    //       createdAt: Number,
    //       updatedAt: Number,
    //     },
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model("Property", propertySchema);
module.exports = Property;
