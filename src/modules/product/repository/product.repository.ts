import { CreateProductDTO } from "../dto/create-product.dto.js";
import { UpdateProductDTO } from "../dto/update-product.dto.js";
import Product, { ProductDocument } from "../schema/product.schema.js";

export class ProductRepository {
  // Save a new product to database
  create = async (
    userId: string,
    data: CreateProductDTO,
  ): Promise<ProductDocument> => {
    const product: ProductDocument = await Product.create({ ...data, userId });

    // Fill user and category info
    await product.populate([
      { path: "userId", select: "name" },
      { path: "categoryId" },
    ]);

    return product;
  };

  // Find product by id
  get = async (id: string): Promise<ProductDocument | null> => {
    const product = await Product.findById(id).populate([
      { path: "userId", select: "name" },
      { path: "categoryId" },
    ]);

    return product;
  };

  // Get only product ids for bulk delete
  getAllIds = async (userId: string): Promise<{ _id: any }[]> => {
    return await Product.find({ userId }, { _id: 1 });
  };

  // Get all products with filter and pagination
  getAll = async (
    userId: string,
    skip: number,
    limit: number,
    categoryId?: string,
  ) => {
    const filter: Record<string, any> = { userId };
    if (categoryId) {
      filter["categoryId"] = categoryId;
    }

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate([
          { path: "userId", select: "name" },
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

  // Update product data by id
  update = async (
    id: string,
    data: UpdateProductDTO,
  ): Promise<ProductDocument | null> => {
    const product = await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate([
      { path: "userId", select: "name" },
      { path: "categoryId" },
    ]);

    return product;
  };

  // Delete product by id and userId
  delete = async (
    productId: string,
    userId: string,
  ): Promise<ProductDocument | null> => {
    return Product.findOneAndDelete({
      _id: productId,
      userId,
    }).populate([
      { path: "userId", select: "name" },
      { path: "categoryId" },
    ]);
  };

  // Delete all products for user
  deleteAll = async (userId: string) => {
    return Product.deleteMany({
      userId,
    });
  };
}
