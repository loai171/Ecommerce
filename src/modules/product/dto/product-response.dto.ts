export interface ProductResponseDTO {
  _id: string;
  name: string;
  price: number;
  description?: string;
  stock: number;
  author: {
    _id: string;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginationResponseDTO {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ProductListResponseDTO {
  products: ProductResponseDTO[];
  pagination: PaginationResponseDTO;
}
