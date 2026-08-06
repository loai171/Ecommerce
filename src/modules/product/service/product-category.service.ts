import { AppError } from "../../../utils/AppError.js";
import { CreateProductCategoryDTO, UpdateProductCategoryDTO } from "../dto/create-category.dto.js";
import { ProductCategoryRepository } from "../repository/product-category.repository.js";
import { ProductCategoryDocument } from "../schema/product-category.schema.js";

export class ProductCategoryService {
  constructor(
    private readonly productCategoryRepository: ProductCategoryRepository,
  ) {}

  // Create a new category
  create = async (
    data: CreateProductCategoryDTO,
  ): Promise<ProductCategoryDocument> => {
    const existing = await this.productCategoryRepository.getByName(data.name);
    if (existing) {
      throw AppError.conflict(`Category with name '${data.name}' already exists`);
    }

    const category: ProductCategoryDocument =
      await this.productCategoryRepository.create(data);
    return category;
  };

  // Get all categories
  getAll = async (): Promise<ProductCategoryDocument[]> => {
    return await this.productCategoryRepository.getAll();
  };

  // Get category by id
  get = async (id: string): Promise<ProductCategoryDocument> => {
    const category = await this.productCategoryRepository.get(id);
    if (!category) {
      throw AppError.notFound(`Category with id ${id} does not exist`);
    }
    return category;
  };

  // Update category by id
  update = async (
    id: string,
    data: UpdateProductCategoryDTO,
  ): Promise<ProductCategoryDocument> => {
    if (data.name) {
      const existing = await this.productCategoryRepository.getByName(data.name);
      if (existing && existing._id.toString() !== id) {
        throw AppError.conflict(`Category with name '${data.name}' already exists`);
      }
    }

    const category = await this.productCategoryRepository.update(id, data);
    if (!category) {
      throw AppError.notFound(`Category with id ${id} does not exist`);
    }
    return category;
  };

  // Delete category by id
  delete = async (id: string): Promise<ProductCategoryDocument> => {
    const category = await this.productCategoryRepository.remove(id);
    if (!category) {
      throw AppError.notFound(`Category with id ${id} does not exist`);
    }
    return category;
  };
}
