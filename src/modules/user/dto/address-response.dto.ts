export interface AddressResponseDTO {
  _id: string;
  user: string;
  country: string;
  city: string;
  street: string;
  isDefault: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
