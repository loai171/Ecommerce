import { Request, Response } from "express";
import { getUserId } from "../../utils/auth.js";
import { matchedData } from "express-validator";
import { AddCartItemDTO } from "./dto/add-item.dto.js";
import { CartService } from "./cart.service.js";
import { successResponse } from "../../utils/response.js";

export class CartController {
  constructor(private readonly cartService: CartService) {}

  addItem = async (req: Request, res: Response): Promise<void> => {
    const userId = getUserId(req);
    const data: AddCartItemDTO = matchedData(req) as AddCartItemDTO;
    const cart = await this.cartService.addItem(data, userId);

    successResponse(res, cart, "Item added to cart successfully");
  };

  getCart = async (req: Request, res: Response): Promise<void> => {
    const userId = getUserId(req);

    const cart = await this.cartService.getCart(userId);

    successResponse(res, cart, "Cart retrieved successfully");
  };

  clearCart = async (req: Request, res: Response): Promise<void> => {
    const userId = getUserId(req);

    const cart = await this.cartService.clearCart(userId);

    successResponse(res, cart, "Cart cleared successfully");
  };

  removeItem = async (req: Request, res: Response): Promise<void> => {
    const userId = getUserId(req);
    const variantId = req.params.variantId as string;
    const cart = await this.cartService.removeItem(userId, variantId);
    successResponse(res, cart, "Item removed from cart successfully");
  };

  updateItemQuantity = async (req: Request, res: Response): Promise<void> => {
    const userId = getUserId(req);
    const variantId = req.params.variantId as string;
    const data = matchedData(req);
    const cart = await this.cartService.updateItemQuantity(
      userId,
      variantId,
      Number(data.quantity),
    );
    successResponse(res, cart, "Cart item quantity updated successfully");
  };
}
