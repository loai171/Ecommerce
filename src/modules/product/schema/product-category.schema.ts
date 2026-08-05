import mongoose from "mongoose";

const productCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    attributes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

export type ProductCategoryType = mongoose.InferSchemaType<
  typeof productCategorySchema
>;

export type ProductCategoryDocument =
  mongoose.HydratedDocument<ProductCategoryType>;

const ProductCategory =
  mongoose.models.ProductCategory ||
  mongoose.model("ProductCategory", productCategorySchema);

export default ProductCategory;
