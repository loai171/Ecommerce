import { ProductCategoryController } from "../modules/product/controllers/product-category.controller.js";
import { ProductVariantController } from "../modules/product/controllers/product-variant.controller.js";
import { ProductController } from "../modules/product/product.controller.js";
import { ProductService } from "../modules/product/product.service.js";
import { ProductCategoryRepository } from "../modules/product/repository/product-category.repository.js";
import { ProductVariantRepository } from "../modules/product/repository/product-variant.repository.js";
import { ProductRepository } from "../modules/product/repository/product.repository.js";
import { ProductCategoryService } from "../modules/product/service/product-category.service.js";
import { ProductVariantService } from "../modules/product/service/product-variant.service.js";

// Product
export const productRepository = new ProductRepository();
export const productVariantRepository = new ProductVariantRepository();

export const productService = new ProductService(
  productRepository,
  productVariantRepository,
);
export const productController = new ProductController(productService);

// Product Category
export const productCategoryRepository = new ProductCategoryRepository();
export const productCategoryService = new ProductCategoryService(
  productCategoryRepository,
);
export const productCategoryController = new ProductCategoryController(
  productCategoryService,
);

// Product Variant
export const productVariantService = new ProductVariantService(
  productVariantRepository,
  productRepository,
  productCategoryRepository,
);
export const productVariantController = new ProductVariantController(
  productVariantService,
);
