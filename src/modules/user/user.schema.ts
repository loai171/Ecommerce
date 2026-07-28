import mongoose from "mongoose";
import { hashingPassword } from "../../utils/helpers.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    // for security
    select: false,
  },

  age: Number,

  file: String,
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await hashingPassword(this.password);
});

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
