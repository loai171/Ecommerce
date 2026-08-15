import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        variantId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ProductVariant",
          required: true,
        },

        quantity: {
          type: Number,
          min: 1,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true },
);

// One cart per user
cartSchema.index({ userId: 1 }, { unique: true });

export type CartType = mongoose.InferSchemaType<typeof cartSchema>;

export type CartDocument = mongoose.HydratedDocument<CartType>;

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;
