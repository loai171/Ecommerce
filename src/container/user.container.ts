import { UserController } from "../modules/user/user.controller.js";
import { UserService } from "../modules/user/user.service.js";
import { UserRepository } from "../modules/user/repository/user.repository.js";
import { AddressRepository } from "../modules/user/repository/address.repository.js";

export const userRepository = new UserRepository();
export const addressRepository = new AddressRepository();

export const userService = new UserService(userRepository, addressRepository);

export const userController = new UserController(userService);
