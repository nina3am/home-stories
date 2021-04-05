const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstname: { type: String, required: [true, "Firstname is required."] },
    lastname: { type: String, required: [true, "Lastname is required."] },
    email: { type: String, required: [true, "Email is required."] },
    password: { type: String, required: [true, "Password is required."] },
    avatar: String,
    properties: [{ type: Schema.Types.ObjectId, ref: "Property" }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
