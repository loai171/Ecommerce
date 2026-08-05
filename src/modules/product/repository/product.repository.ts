import { CreateProductDTO } from "../dto/create-product.dto.js";
import { UpdateProductDTO } from "../dto/update-product.dto.js";
import Product, { ProductDocument } from "../schema/product.schema.js";

export class ProductRepository {
  create = async (
    author: string,
    data: CreateProductDTO,
  ): Promise<ProductDocument> => {
    const product: ProductDocument = await Product.create({ ...data, author });

    await product.populate([
      { path: "author", select: "name" },
      { path: "categoryId" },
    ]);

    return product;
  };

  get = async (id: string): Promise<ProductDocument | null> => {
    const product = await Product.findById(id).populate([
      { path: "author", select: "name" },
      { path: "categoryId" },
    ]);

    return product;
  };

  getAll = async (
    userId: string,
    skip: number,
    limit: number,
    categoryId?: string,
  ) => {
    const filter: Record<string, any> = { author: userId };
    if (categoryId) {
      filter["categoryId"] = categoryId;
    }

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate([
          { path: "author", select: "name" },
          { path: "categoryId" },
        ])
        .skip(skip)
        .limit(limit),

      Product.countDocuments(filter),
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
      runValidators: true,
    }).populate([
      { path: "author", select: "name" },
      { path: "categoryId" },
    ]);

    return product;
  };

  delete = async (
    productId: string,
    userId: string,
  ): Promise<ProductDocument | null> => {
    return Product.findOneAndDelete({
      _id: productId,
      author: userId,
    }).populate([
      { path: "author", select: "name" },
      { path: "categoryId" },
    ]);
  };

  deleteAll = async (userId: string) => {
    return Product.deleteMany({
      author: userId,
    });
  };
}
