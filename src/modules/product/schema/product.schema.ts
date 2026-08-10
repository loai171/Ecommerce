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

    slug: {
      type: String,
      trim: true,
      lowercase: true,
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
// Generate slug from product name
productSchema.pre("save", function () {
  if (this.isModified("name")) {
    this.slug = this.name.toLowerCase().trim().split(" ").join("-");
  }
});

// Same user cannot have two products with the same slug
productSchema.index(
  {
    userId: 1,
    slug: 1,
  },
  {
    unique: true,
  },
);

export type ProductType = mongoose.InferSchemaType<typeof productSchema>;

export type ProductDocument = mongoose.HydratedDocument<ProductType>;

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
