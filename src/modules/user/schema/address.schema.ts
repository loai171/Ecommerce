import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    street: {
      type: String,
      required: true,
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export type AddressType = mongoose.InferSchemaType<typeof addressSchema>;
export type AddressDocument = mongoose.HydratedDocument<AddressType>;

const Address =
  mongoose.models?.Address || mongoose.model("Address", addressSchema);

export default Address;
