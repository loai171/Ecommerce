import mongoose from "mongoose";

const productVariantSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    attributesValue: {
      type: Map,
      of: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
  },
  { timestamps: true },
);

export type ProductVariantType = mongoose.InferSchemaType<
  typeof productVariantSchema
>;

export type ProductVariantDocument =
  mongoose.HydratedDocument<ProductVariantType>;

const ProductVariant =
  mongoose.models.ProductVariant ||
  mongoose.model("ProductVariant", productVariantSchema);

export default ProductVariant;
