import type { AddressResponseDTO } from "./address-response.dto.js";

export interface UserResponseDTO {
  _id: string;
  name?: string;
  email: string;
  age?: number;
  file?: string;
  addresses?: AddressResponseDTO[];
}
