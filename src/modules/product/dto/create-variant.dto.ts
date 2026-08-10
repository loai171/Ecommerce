export interface CreateProductVariantDTO {
  productId: string;
  attributesValue: Record<string, string>;
  price: number;
  stock?: number;
  sku: string;
}

export interface UpdateProductVariantDTO {
  attributesValue?: Record<string, string>;
  price?: number;
  stock?: number;
  sku?: string;
}
