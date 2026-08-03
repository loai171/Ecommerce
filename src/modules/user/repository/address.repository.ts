import type { CreateAddressDto } from "../dto/create-assress.dto.js";
import Address, { type AddressDocument } from "../schema/address.schema.js";

export class AddressRepository {
  create = async (
    userId: string,
    data: CreateAddressDto,
  ): Promise<AddressDocument> => {
    if (data.isDefault) {
      await Address.updateMany({ user: userId }, { isDefault: false });
    }

    const address: AddressDocument = await Address.create({
      ...data,
      user: userId,
    });

    return address;
  };
}
