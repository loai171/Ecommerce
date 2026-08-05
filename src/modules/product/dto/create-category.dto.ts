export interface CreateProductCategoryDTO {
  name: string;
  attributes: string[];
}

export interface UpdateProductCategoryDTO {
  name?: string;
  attributes?: string[];
}
