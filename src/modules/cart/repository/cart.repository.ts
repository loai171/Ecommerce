import { AddCartItemDTO } from "../dto/add-item.dto.js";
import Cart, { CartDocument } from "../schema/cart.schema.js";

const getVariantIdString = (variantId): string => {
  if (!variantId) return "";
  if (typeof variantId === "object" && "_id" in variantId) {
    return variantId._id.toString();
  }
  return variantId.toString();
};

export class CartRepository {
  addItem = async (
    data: AddCartItemDTO,
    userId: string,
  ): Promise<CartDocument> => {
    let cart = await this.getCart(userId);

    const quantity = data.quantity ?? 1;

    if (!cart) {
      const newCart = await Cart.create({
        userId,
        items: [
          {
            variantId: data.variantId,
            quantity,
          },
        ],
      });

      return await newCart.populate("items.variantId");
    }

    const item = cart.items.find(
      (item) => getVariantIdString(item.variantId) === data.variantId,
    );

    if (item) {
      item.quantity += quantity;
    } else {
      cart.items.push({
        variantId: data.variantId,
        quantity,
      });
    }

    await cart.save();

    return await cart.populate("items.variantId");
  };

  getCart = async (userId: string): Promise<CartDocument | null> => {
    return await Cart.findOne({ userId }).populate("items.variantId");
  };

  clearCart = async (userId: string): Promise<CartDocument | null> => {
    const cart = await Cart.findOne({ userId });

    if (!cart) return null;

    cart.items = [];

    return await cart.save();
  };

  findByUserId = async (userId: string): Promise<CartDocument | null> => {
    return await Cart.findOne({ userId });
  };

  removeItem = async (
    userId: string,
    variantId: string,
  ): Promise<CartDocument | null> => {
    const cart = await this.findByUserId(userId);

    if (!cart) return null;

    cart.items = cart.items.filter(
      (item) => getVariantIdString(item.variantId) !== variantId,
    );

    await cart.save();

    return await cart.populate("items.variantId");
  };

  updateItemQuantity = async (
    userId: string,
    variantId: string,
    quantity: number,
  ): Promise<CartDocument | null> => {
    const cart = await this.findByUserId(userId);

    if (!cart) return null;

    const item = cart.items.find(
      (item) => getVariantIdString(item.variantId) === variantId,
    );

    if (!item) return null;

    item.quantity = quantity;

    await cart.save();

    return await cart.populate("items.variantId");
  };
}

