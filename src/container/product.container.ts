import { ProductController } from "../modules/product/product.controller.js";
import { ProductService } from "../modules/product/product.service.js";
import { ProductRepository } from "../modules/product/repository/product.repository.js";

export const productRepository = new ProductRepository();

export const productService = new ProductService(productRepository);

export const productController = new ProductController(productService);
