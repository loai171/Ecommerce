import { CreateProductVariantDTO, UpdateProductVariantDTO } from "../dto/create-variant.dto.js";
import ProductVariant, {
  ProductVariantDocument,
} from "../schema/product-variant.schema.js";

export class ProductVariantRepository {
  create = async (
    data: CreateProductVariantDTO,
  ): Promise<ProductVariantDocument> => {
    const variant: ProductVariantDocument = await ProductVariant.create(data);
    await variant.populate("productId");
    return variant;
  };

  getAllByProductId = async (
    productId: string,
  ): Promise<ProductVariantDocument[]> => {
    return await ProductVariant.find({ productId }).populate("productId");
  };

  get = async (id: string): Promise<ProductVariantDocument | null> => {
    return await ProductVariant.findById(id).populate("productId");
  };

  findByProductId = async (
    productId: string,
  ): Promise<ProductVariantDocument[]> => {
    return await ProductVariant.find({ productId });
  };

  update = async (
    id: string,
    data: UpdateProductVariantDTO,
  ): Promise<ProductVariantDocument | null> => {
    return await ProductVariant.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate("productId");
  };

  delete = async (id: string): Promise<ProductVariantDocument | null> => {
    return await ProductVariant.findByIdAndDelete(id).populate("productId");
  };

  deleteAllByProductId = async (productId: string) => {
    return await ProductVariant.deleteMany({ productId });
  };
}
