import { AppError } from "../../../utils/AppError.js";
import {
  CreateProductVariantDTO,
  UpdateProductVariantDTO,
} from "../dto/create-variant.dto.js";
import { ProductCategoryRepository } from "../repository/product-category.repository.js";
import { ProductVariantRepository } from "../repository/product-variant.repository.js";
import { ProductRepository } from "../repository/product.repository.js";
import { ProductVariantDocument } from "../schema/product-variant.schema.js";

export class ProductVariantService {
  constructor(
    private readonly productVariantRepository: ProductVariantRepository,
    private readonly productRepository: ProductRepository,
    private readonly productCategoryRepository: ProductCategoryRepository,
  ) {}

  private validateAttributes = async (
    categoryId: string,
    attributesValue: Record<string, string>,
  ) => {
    const category = await this.productCategoryRepository.get(categoryId);

    if (!category) {
      throw AppError.notFound("Product category not found");
    }

    const allowedAttributes = category.attributes;
    const givenAttributes = Object.keys(attributesValue);

    const invalidAttributes = givenAttributes.filter(
      (attr) => !allowedAttributes.includes(attr),
    );

    if (invalidAttributes.length > 0) {
      throw AppError.badRequest(
        `Invalid attributes: ${invalidAttributes.join(", ")}`,
      );
    }

    const missingAttributes = allowedAttributes.filter(
      (attr) => !givenAttributes.includes(attr),
    );

    if (missingAttributes.length > 0) {
      throw AppError.badRequest(
        `Missing attributes: ${missingAttributes.join(", ")}`,
      );
    }
  };

  create = async (
    userId: string,
    input: CreateProductVariantDTO,
  ): Promise<ProductVariantDocument> => {
    const product = await this.productRepository.get(input.productId);

    if (!product) {
      throw AppError.notFound("Product not found");
    }

    if (product.author._id.toString() !== userId) {
      throw AppError.forbidden(
        "You are not allowed to add a variant to this product",
      );
    }

    await this.validateAttributes(
      product.categoryId._id.toString(),
      input.attributesValue,
    );

    return await this.productVariantRepository.create(input);
  };

  getAllByProductId = async (
    productId: string,
    userId: string,
  ): Promise<ProductVariantDocument[]> => {
    const product = await this.productRepository.get(productId);
    if (!product) {
      throw AppError.notFound("Product not found");
    }

    if (product.author._id.toString() !== userId) {
      throw AppError.forbidden(
        "You are not allowed to view variants for this product",
      );
    }

    return await this.productVariantRepository.getAllByProductId(productId);
  };

  get = async (
    variantId: string,
    userId: string,
  ): Promise<ProductVariantDocument> => {
    const variant = await this.productVariantRepository.get(variantId);
    if (!variant) {
      throw AppError.notFound("Product variant not found");
    }

    const product = await this.productRepository.get(
      variant.productId._id.toString(),
    );

    if (!product || product.author._id.toString() !== userId) {
      throw AppError.forbidden(
        "You are not allowed to view this product variant",
      );
    }

    return variant;
  };

  update = async (
    variantId: string,
    userId: string,
    data: UpdateProductVariantDTO,
  ): Promise<ProductVariantDocument> => {
    const variant = await this.productVariantRepository.get(variantId);
    if (!variant) {
      throw AppError.notFound("Product variant not found");
    }

    const productId = variant.productId._id.toString();
    const product = await this.productRepository.get(productId);

    if (!product || product.author._id.toString() !== userId) {
      throw AppError.forbidden(
        "You are not allowed to update this product variant",
      );
    }

    if (data.attributesValue) {
      await this.validateAttributes(
        product.categoryId._id.toString(),
        data.attributesValue,
      );
    }

    const updatedVariant = await this.productVariantRepository.update(
      variantId,
      data,
    );

    if (!updatedVariant) {
      throw AppError.notFound("Product variant not found");
    }

    return updatedVariant;
  };

  delete = async (
    variantId: string,
    userId: string,
  ): Promise<ProductVariantDocument> => {
    const variant = await this.productVariantRepository.get(variantId);
    if (!variant) {
      throw AppError.notFound("Product variant not found");
    }

    const product = await this.productRepository.get(
      variant.productId._id.toString(),
    );

    if (!product || product.author._id.toString() !== userId) {
      throw AppError.forbidden(
        "You are not allowed to delete this product variant",
      );
    }

    const deletedVariant =
      await this.productVariantRepository.delete(variantId);
    if (!deletedVariant) {
      throw AppError.notFound("Product variant not found");
    }

    return deletedVariant;
  };
}
