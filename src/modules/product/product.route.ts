import { Router } from "express";
import {
  productCategoryController,
  productController,
  productVariantController,
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
import {
  createProductVariantValidator,
  existingProductIdParamValidator,
  existingVariantIdValidator,
  updateProductVariantValidator,
} from "./validation/productVariant.js";

const router: Router = Router();

// Category Routes (Static routes defined first)
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

// Variant Routes (Static sub-path routes defined before /:id)
router
  .route("/product-variants")
  .post(
    authMiddleware,
    createProductVariantValidator,
    validate,
    productVariantController.create,
  );

router
  .route("/product-variants/product/:productId")
  .get(
    authMiddleware,
    existingProductIdParamValidator,
    validate,
    productVariantController.getAllByProductId,
  );

router
  .route("/product-variants/:id")
  .get(
    authMiddleware,
    existingVariantIdValidator,
    validate,
    productVariantController.get,
  )
  .patch(
    authMiddleware,
    existingVariantIdValidator,
    updateProductVariantValidator,
    validate,
    productVariantController.update,
  )
  .delete(
    authMiddleware,
    existingVariantIdValidator,
    validate,
    productVariantController.delete,
  );

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

export const productRoutes = router;
