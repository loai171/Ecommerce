import { CreateProductDTO } from "../dto/create-product.dto.js";
import { UpdateProductDTO } from "../dto/update-product.dto.js";
import Product, { productDocument } from "../schema/product.schema.js";

export const productRepository = {
  create: async (
    author: string,
    data: CreateProductDTO,
  ): Promise<productDocument> => {
    const product: productDocument = await Product.create({ ...data, author });

    await product.populate("author", "name");

    return product;
  },
  get: async (id: string): Promise<productDocument> => {
    const product: productDocument = await Product.findById(id).populate(
      "author",
      "name",
    );

    return product;
  },
  getAll: async (userId: string): Promise<productDocument[]> => {
    const products: productDocument[] = await Product.find({
      author: userId,
    }).populate("author", "name");

    return products;
  },
  update: async (
    id: string,
    data: UpdateProductDTO,
  ): Promise<productDocument | null> => {
    const product = await Product.findByIdAndUpdate(id, data, {
      new: true,
    }).populate("author", "name");

    return product;
  },
  delete: async (
    productId: string,
    userId: string,
  ): Promise<productDocument> => {
    return Product.findOneAndDelete({
      _id: productId,
      author: userId,
    }).populate("author", "name");
  },
  deleteAll: async (userId: string) => {
    return Product.deleteMany({
      author: userId,
    });
  },
};
