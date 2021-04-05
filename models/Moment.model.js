const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const momentSchema = new Schema(
  {
    name: String,
    description: String,
    images: [String],
    documents: [String],
    categories: [
      {
        category: { type: String, enum: ["piece", "bâtiment", "éléments"] },
        name: { type: String, enum: ["chambre", "SDB", "salon"] },
        taille: String,
        photos: [String],
      },
    ],
    types: [
      {
        type: { type: String, enum: ["travaux", "aménagement", "achat"] },
        price: String,
        timeSpent: String,
        documents: [String],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Moment = mongoose.model("Moment", momentSchema);
module.exports = Moment;
