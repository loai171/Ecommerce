export class CreateAddressDto {
  country!: string;
  city!: string;
  street!: string;
  isDefault?: boolean;
}
