import { Router } from "express";
import { productController } from "./product.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import {
  createProductValidator,
  existingId,
  updateProductValidator,
} from "./validation/product.validator.js";
import { validate } from "../../middlewares/validate.middleware.js";

const router: Router = Router();

router.post(
  "/",
  authMiddleware,
  createProductValidator,
  validate,
  productController.create,
);
router.get("/", authMiddleware, productController.getAll);
router.get(
  "/:id",
  authMiddleware,
  existingId,
  validate,
  productController.get,
);
router.patch(
  "/:id",
  authMiddleware,
  updateProductValidator,
  existingId,
  validate,
  productController.update,
);
router.delete(
  "/:id",
  authMiddleware,
  existingId,
  validate,
  productController.delete,
);
router.delete("/", authMiddleware, productController.deleteAll);

export const productRoutes = router;
