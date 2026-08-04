import { AppError } from "../../utils/AppError.js";
import { CreateProductDTO } from "./dto/create-product.dto.js";
import { UpdateProductDTO } from "./dto/update-product.dto.js";
import { productDocument } from "./schema/product.schema.js";
import { ProductRepository } from "./repository/product.repository.js";
import { ProductQueryDTO } from "./dto/product-query.dto.js";
import { env } from "../../config/env.js";
import { ProductListResponseDTO } from "./dto/product-response.dto.js";

export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  create = async (
    userId: string,
    input: CreateProductDTO,
  ): Promise<productDocument> => {
    const product: productDocument = await this.productRepository.create(
      userId,
      input,
    );

    return product;
  };
  getAll = async (
    userId: string,
    query: ProductQueryDTO,
  ): Promise<ProductListResponseDTO> => {
    const page = query.page ?? env.PAGINATION_DEFAULT_PAGE;
    const limit = query.limit ?? env.PAGINATION_DEFAULT_LIMIT;

    const skip = (page - 1) * limit;

    const { products, total } = await this.productRepository.getAll(
      userId,
      skip,
      limit,
    );

    const totalPages = Math.ceil(total / limit);

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  };
  get = async (productId: string, userId: string): Promise<productDocument> => {
    const product = await this.productRepository.get(productId);
    if (!product) {
      throw AppError.notFound("Product not found");
    }
    if (product.author._id.toString() !== userId) {
      throw AppError.forbidden("You are not allowed to get this product");
    }

    return product;
  };
  update = async (
    productId: string,
    userId: string,
    data: UpdateProductDTO,
  ): Promise<productDocument> => {
    const existingProduct = await this.productRepository.get(productId);

    if (!existingProduct) {
      throw AppError.notFound("Product not found");
    }

    if (existingProduct.author._id.toString() !== userId) {
      throw AppError.forbidden("You are not allowed to update this product");
    }

    const product = await this.productRepository.update(productId, data);

    if (!product) {
      throw AppError.notFound("Product not found");
    }

    return product;
  };
  delete = async (
    productId: string,
    userId: string,
  ): Promise<productDocument> => {
    const product = await this.productRepository.delete(productId, userId);

    return product;
  };
  deleteAll = async (userId: string): Promise<any> => {
    const result = await this.productRepository.deleteAll(userId);
    return result;
  };
}
