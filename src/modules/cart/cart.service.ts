import { AppError } from "../../utils/AppError.js";
import { AddCartItemDTO } from "./dto/add-item.dto.js";
import { CartRepository } from "./repository/cart.repository.js";
import { CartDocument } from "./schema/cart.schema.js";
import { ProductVariantRepository } from "../product/repository/product-variant.repository.js";

const getVariantIdString = (variantId): string => {
  if (!variantId) return "";
  if (typeof variantId === "object" && "_id" in variantId) {
    return variantId._id.toString();
  }
  return variantId.toString();
};

export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly productVariantRepository: ProductVariantRepository,
  ) {}

  addItem = async (data: AddCartItemDTO, userId: string) => {
    const variant = await this.productVariantRepository.get(data.variantId);
    if (!variant) {
      throw AppError.notFound("Product variant not found");
    }

    const requestedQuantity = data.quantity ?? 1;
    const existingCart = await this.cartRepository.getCart(userId);
    let currentInCart = 0;

    if (existingCart) {
      const existingItem = existingCart.items.find(
        (item) => getVariantIdString(item.variantId) === data.variantId,
      );
      if (existingItem) {
        currentInCart = existingItem.quantity;
      }
    }

    if (currentInCart + requestedQuantity > variant.stock) {
      throw AppError.badRequest(
        `Requested quantity (${currentInCart + requestedQuantity}) exceeds available stock (${variant.stock})`,
      );
    }

    return await this.cartRepository.addItem(data, userId);
  };

  updateItemQuantity = async (
    userId: string,
    variantId: string,
    quantity: number,
  ): Promise<CartDocument> => {
    const variant = await this.productVariantRepository.get(variantId);
    if (!variant) {
      throw AppError.notFound("Product variant not found");
    }

    if (quantity > variant.stock) {
      throw AppError.badRequest(
        `Requested quantity (${quantity}) exceeds available stock (${variant.stock})`,
      );
    }

    const cart = await this.cartRepository.updateItemQuantity(
      userId,
      variantId,
      quantity,
    );

    if (!cart) {
      throw AppError.notFound("Cart or item in cart not found");
    }

    return cart;
  };

  getCart = async (userId: string) => {
    const cart = await this.cartRepository.getCart(userId);

    if (!cart) {
      throw AppError.notFound("Cart not found");
    }

    return cart;
  };

  clearCart = async (userId: string) => {
    return await this.cartRepository.clearCart(userId);
  };

  removeItem = async (
    userId: string,
    variantId: string,
  ): Promise<CartDocument> => {
    const cart = await this.cartRepository.removeItem(userId, variantId);

    if (!cart) {
      throw AppError.notFound("Cart not found");
    }

    return cart;
  };
}
