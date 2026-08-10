import { AppError } from "../../utils/AppError.js";
import { CreateProductDTO } from "./dto/create-product.dto.js";
import { UpdateProductDTO } from "./dto/update-product.dto.js";
import { ProductDocument } from "./schema/product.schema.js";
import { ProductRepository } from "./repository/product.repository.js";
import { ProductVariantRepository } from "./repository/product-variant.repository.js";
import { ProductQueryDTO } from "./dto/product-query.dto.js";
import { env } from "../../config/env.js";
import { ProductListResponseDTO } from "./dto/product-response.dto.js";

export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productVariantRepository: ProductVariantRepository,
  ) {}

  // Create a new product in database
  create = async (
    userId: string,
    input: CreateProductDTO,
  ): Promise<ProductDocument> => {
    const product: ProductDocument = await this.productRepository.create(
      userId,
      input,
    );

    return product;
  };

  // Get all products for user with page and limit
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
      query.categoryId,
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

  // Get one product by id
  get = async (productId: string, userId: string): Promise<ProductDocument> => {
    const product = await this.productRepository.get(productId);
    if (!product) {
      throw AppError.notFound("Product not found");
    }
    if (
      ((product.userId as any)._id?.toString() ??
        (product.userId as any).toString()) !== userId
    ) {
      throw AppError.forbidden("You are not allowed to get this product");
    }

    return product;
  };

  // Update product details
  update = async (
    productId: string,
    userId: string,
    data: UpdateProductDTO,
  ): Promise<ProductDocument> => {
    const existingProduct = await this.productRepository.get(productId);

    if (!existingProduct) {
      throw AppError.notFound("Product not found");
    }

    if (
      ((existingProduct.userId as any)._id?.toString() ??
        (existingProduct.userId as any).toString()) !== userId
    ) {
      throw AppError.forbidden("You are not allowed to update this product");
    }

    const product = await this.productRepository.update(productId, data);

    if (!product) {
      throw AppError.notFound("Product not found");
    }

    return product;
  };

  // Delete product and all its variants
  delete = async (
    productId: string,
    userId: string,
  ): Promise<ProductDocument> => {
    const product = await this.productRepository.delete(productId, userId);
    if (!product) {
      throw AppError.notFound("Product not found");
    }

    // Delete all variants of this product
    await this.productVariantRepository.deleteAllByProductId(productId);

    return product;
  };

  // Delete all products and all variants for user
  deleteAll = async (userId: string): Promise<any> => {
    const products = await this.productRepository.getAllIds(userId);
    const productIds = products.map((p) => p._id.toString());

    // Delete all variants for all user products
    await Promise.all(
      productIds.map((id) =>
        this.productVariantRepository.deleteAllByProductId(id),
      ),
    );

    return await this.productRepository.deleteAll(userId);
  };
}
