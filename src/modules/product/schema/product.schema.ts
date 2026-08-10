import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
      required: true,
    },
  },
  { timestamps: true },
);

export type ProductType = mongoose.InferSchemaType<typeof productSchema>;

export type ProductDocument = mongoose.HydratedDocument<ProductType>;

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
