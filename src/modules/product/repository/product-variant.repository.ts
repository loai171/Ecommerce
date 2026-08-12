import {
  CreateProductVariantDTO,
  UpdateProductVariantDTO,
} from "../dto/create-variant.dto.js";
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
  getBySku = async (sku: string): Promise<ProductVariantDocument | null> => {
    return await ProductVariant.findOne({ sku }).populate("productId");
  };

  update = async (
    id: string,
    data: UpdateProductVariantDTO,
  ): Promise<ProductVariantDocument | null> => {
    const updateData: Record<string, any> = { ...data };

    if (data.attributesValue) {
      delete updateData.attributesValue;
      const map = data.attributesValue;
      for (const key of Object.keys(map)) {
        updateData[`attributesValue.${key}`] = map[key];
      }
    }

    return await ProductVariant.findByIdAndUpdate(
      id,
      { $set: updateData },
      {
        new: true,
      },
    ).populate("productId");
  };

  delete = async (id: string): Promise<ProductVariantDocument | null> => {
    return await ProductVariant.findByIdAndDelete(id).populate("productId");
  };

  deleteAllByProductId = async (productId: string) => {
    return await ProductVariant.deleteMany({ productId });
  };
}
