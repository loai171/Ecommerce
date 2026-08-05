export interface CreateProductVariantDTO {
  productId: string;
  attributesValue: Record<string, string>;
  price: number;
  stock?: number;
}

export interface UpdateProductVariantDTO {
  attributesValue?: Record<string, string>;
  price?: number;
  stock?: number;
}
