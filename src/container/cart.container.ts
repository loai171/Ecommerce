import { CartController } from "../modules/cart/cart.controller.js";
import { CartService } from "../modules/cart/cart.service.js";
import { CartRepository } from "../modules/cart/repository/cart.repository.js";
import { productVariantRepository } from "./product.container.js";

// Cart
export const cartRepository = new CartRepository();

export const cartService = new CartService(
  cartRepository,
  productVariantRepository,
);

export const cartController = new CartController(cartService);

