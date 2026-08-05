import { CreateProductDTO } from "../dto/create-product.dto.js";
import { UpdateProductDTO } from "../dto/update-product.dto.js";
import Product, { ProductDocument } from "../schema/product.schema.js";

export class ProductRepository {
  create = async (
    author: string,
    data: CreateProductDTO,
  ): Promise<ProductDocument> => {
    const product: ProductDocument = await Product.create({ ...data, author });

    await product.populate("author", "name");

    return product;
  };
  get = async (id: string): Promise<ProductDocument> => {
    const product: ProductDocument = await Product.findById(id).populate(
      "author",
      "name",
    );

    return product;
  };
  getAll = async (userId: string, skip: number, limit: number) => {
    const [products, total] = await Promise.all([
      Product.find({
        author: userId,
      })
        .populate("author", "name")
        .skip(skip)
        .limit(limit),

      Product.countDocuments({
        author: userId,
      }),
    ]);

    return {
      products,
      total,
    };
  };
  update = async (
    id: string,
    data: UpdateProductDTO,
  ): Promise<ProductDocument | null> => {
    const product = await Product.findByIdAndUpdate(id, data, {
      new: true,
    }).populate("author", "name");

    return product;
  };
  delete = async (
    productId: string,
    userId: string,
  ): Promise<ProductDocument> => {
    return Product.findOneAndDelete({
      _id: productId,
      author: userId,
    }).populate("author", "name");
  };
  deleteAll = async (userId: string) => {
    return Product.deleteMany({
      author: userId,
    });
  };
}
