import { AppError } from "../../utils/AppError.js";
import { CreateProductDTO } from "./dto/create-product.dto.js";
import { UpdateProductDTO } from "./dto/update-product.dto.js";
import { productRepository } from "./repository/product.repository.js";
import { productDocument } from "./schema/product.schema.js";

export const productService = {
  async create(
    userId: string,
    input: CreateProductDTO,
  ): Promise<productDocument> {
    const product: productDocument = await productRepository.create(
      userId,
      input,
    );

    return product;
  },
  async getAll(userId: string): Promise<productDocument[]> {
    const products: productDocument[] = await productRepository.getAll(userId);

    return products;
  },
  async get(productId: string, userId: string): Promise<productDocument> {
    const product = await productRepository.get(productId);
    if (product.author._id.toString() !== userId) {
      throw AppError.forbidden("You are not allowed to get this product");
    }

    return product;
  },
  async update(
    productId: string,
    userId: string,
    data: UpdateProductDTO,
  ): Promise<productDocument> {
    const existingProduct = await productRepository.get(productId);

    if (existingProduct.author._id.toString() !== userId) {
      throw AppError.forbidden("You are not allowed to update this product");
    }

    const product = await productRepository.update(productId, data);

    return product;
  },
  async delete(productId: string, userId: string): Promise<productDocument> {
    const product = await productRepository.delete(productId, userId);

    return product;
  },
  async deleteAll(userId: string) {
    const result = await productRepository.deleteAll(userId);
    return result;
  },
};
