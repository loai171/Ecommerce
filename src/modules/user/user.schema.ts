import mongoose from "mongoose";
import { z } from "zod";

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

export const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export default User;
