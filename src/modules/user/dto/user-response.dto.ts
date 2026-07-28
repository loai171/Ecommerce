export interface UserResponseDTO {
  _id: string;
  name: string;
  email: string;
  age?: number | null;
  file?: string | null;
}
