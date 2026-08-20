import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import {
  addCartItemValidator,
  existingCartItemValidator,
  updateCartItemQuantityValidator,
} from "./validations/cart.validation.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { cartController } from "../../container/cart.container.js";

const router = Router();

router
  .route("/")
  .get(authMiddleware, cartController.getCart)
  .delete(authMiddleware, cartController.clearCart);

router
  .route("/items")
  .post(authMiddleware, addCartItemValidator, validate, cartController.update);

router
  .route("/items/:sku")
  .patch(
    authMiddleware,
    updateCartItemQuantityValidator,
    validate,
    cartController.updateItemQuantity,
  )
  .delete(
    authMiddleware,
    existingCartItemValidator,
    validate,
    cartController.removeItem,
  );

export const cartRoutes = router;
