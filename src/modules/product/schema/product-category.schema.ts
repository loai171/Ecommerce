import mongoose from "mongoose";

const productCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    attributes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);
// Unique index on category name
productCategorySchema.index({ name: 1 }, { unique: true });

export type ProductCategoryType = mongoose.InferSchemaType<
  typeof productCategorySchema
>;

export type ProductCategoryDocument =
  mongoose.HydratedDocument<ProductCategoryType>;

const ProductCategory =
  mongoose.models.ProductCategory ||
  mongoose.model("ProductCategory", productCategorySchema);

export default ProductCategory;
