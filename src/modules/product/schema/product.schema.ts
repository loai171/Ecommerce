import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export type productType = mongoose.InferSchemaType<typeof productSchema>;
export type productDocument = mongoose.HydratedDocument<productType>;

const product =
  mongoose.models?.product || mongoose.model("product", productSchema);

export default product;
