export interface UpdateUserDTO {
  name?: string;
  email?: string;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  age?: number;
  file?: string;
}
