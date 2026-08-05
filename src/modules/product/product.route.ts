import { Router } from "express";
import {
  productCategoryController,
  productController,
} from "../../container/product.container.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import {
  createProductValidator,
  existingId,
  productQueryValidator,
  updateProductValidator,
} from "./validation/product.validator.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  createProductCategoryValidator,
  existingCategoryIdValidator,
  updateProductCategoryValidator,
} from "./validation/productCategory.js";

const router: Router = Router();

// Product Routes
router.post(
  "/",
  authMiddleware,
  createProductValidator,
  validate,
  productController.create,
);
router.get(
  "/",
  authMiddleware,
  productQueryValidator,
  validate,
  productController.getAll,
);
router.get("/:id", authMiddleware, existingId, validate, productController.get);
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

// Category Routes
router
  .route("/product-categories")
  .post(
    authMiddleware,
    createProductCategoryValidator,
    validate,
    productCategoryController.create,
  )
  .get(authMiddleware, productCategoryController.getAll);

router
  .route("/product-categories/:id")
  .get(
    authMiddleware,
    existingCategoryIdValidator,
    validate,
    productCategoryController.get,
  )
  .patch(
    authMiddleware,
    existingCategoryIdValidator,
    updateProductCategoryValidator,
    validate,
    productCategoryController.update,
  )
  .delete(
    authMiddleware,
    existingCategoryIdValidator,
    validate,
    productCategoryController.delete,
  );

export const productRoutes = router;
