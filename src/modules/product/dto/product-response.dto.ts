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