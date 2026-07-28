import type { AddressResponseDTO } from "./address-response.dto.js";

export interface UserResponseDTO {
  _id: string;
  name?: string | null;
  email: string;
  age?: number | null;
  file?: string | null;
  addresses?: AddressResponseDTO[];
}
