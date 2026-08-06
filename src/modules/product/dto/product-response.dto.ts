import { ProductDocument } from "../schema/product.schema.js";

export interface PaginationResponseDTO {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ProductListResponseDTO {
  products: ProductDocument[];
  pagination: PaginationResponseDTO;
}
