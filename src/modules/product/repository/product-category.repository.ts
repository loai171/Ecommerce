import { CreateProductCategoryDTO, UpdateProductCategoryDTO } from "../dto/create-category.dto.js";
import ProductCategory, {
  ProductCategoryDocument,
} from "../schema/product-category.schema.js";

export class ProductCategoryRepository {
  create = async (
    data: CreateProductCategoryDTO,
  ): Promise<ProductCategoryDocument> => {
    const productCategory = await ProductCategory.create(data);

    return productCategory;
  };

  getAll = async (): Promise<ProductCategoryDocument[]> => {
    const productCategories = await ProductCategory.find();

    return productCategories;
  };

  get = async (id: string): Promise<ProductCategoryDocument | null> => {
    const productCategory = await ProductCategory.findById(id);

    return productCategory;
  };

  getByName = async (name: string): Promise<ProductCategoryDocument | null> => {
    const productCategory = await ProductCategory.findOne({ name });
    return productCategory;
  };

  update = async (
    id: string,
    data: UpdateProductCategoryDTO,
  ): Promise<ProductCategoryDocument | null> => {
    const productCategory = await ProductCategory.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    return productCategory;
  };

  remove = async (id: string): Promise<ProductCategoryDocument | null> => {
    const productCategory = await ProductCategory.findByIdAndDelete(id);

    return productCategory;
  };
}
