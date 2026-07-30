import mongoose from "mongoose";
import crypto from "node:crypto";
import { hashingPassword } from "../../../utils/helpers.js";
import Address from "./address.schema.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    age: Number,

    file: String,
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    id: false,
  },
);

userSchema.virtual("addresses", {
  ref: "Address",
  localField: "_id",
  foreignField: "user",
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await hashingPassword(this.password);
});

userSchema.pre("save", async function () {
  if (this.isNew && !this.name) {
    const randomName = crypto.randomBytes(6).toString("hex");

    this.name = randomName;
  }
});

userSchema.pre("findOneAndDelete", async function () {
  // this.getFilter will be returned the id or email "use to find in your repository"
  const user = await this.model.findOne(this.getFilter());

  if (user) {
    await Address.deleteMany({
      user: user._id,
    });
  }
});

export type UserType = mongoose.InferSchemaType<typeof userSchema>;
export type UserDocument = mongoose.HydratedDocument<UserType>;

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
