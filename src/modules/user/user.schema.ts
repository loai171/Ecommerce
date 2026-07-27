import mongoose from "mongoose";

const schemaObject = {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  file: {
    type: String,
  },
};

const userSchema = new mongoose.Schema(schemaObject);

const User = mongoose.models?.["User"] || mongoose.model("User", userSchema);

export default User;
