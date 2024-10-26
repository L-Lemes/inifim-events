import { TDataToBeCreated } from "../../repositories/types-base.js";
import { IUser } from "../../repositories/user/types-user-reposiotry.js";
import { UserRepository } from "../../repositories/user/user-repository.js";


export class CreateUserUseCase {
  constructor(private userRepository: UserRepository){}

  execute(userToBeCreatedData: TDataToBeCreated<IUser>) {
    const newUser = this.userRepository.create(userToBeCreatedData)
    return newUser
  }
}