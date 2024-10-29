import { TDataToBeCreated } from "../../repositories/types-base.js";
import { IUser } from "../../repositories/user/types-user-reposiotry.js";
import { UserRepository } from "../../repositories/user/user-repository.js";
import { generateAccessToken } from "../../utils/generate-jwt.js";
import { generateRefreshToken } from "../../utils/generate-refresh-jwt.js";
import { hashPassword } from "../../utils/hash-password.js";


export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository){}

  async execute(userToBeCreatedData: TDataToBeCreated<IUser>) {
    const emailAlreadyExists = await this.userRepository.findByEmail(userToBeCreatedData.email)

    if(emailAlreadyExists) throw new Error("O email ja está cadastrado");

    
    const newDataWithHashPassword = {
      ...userToBeCreatedData,
      password: await hashPassword(userToBeCreatedData.password)
    }

    const newUser = await this.userRepository.create(newDataWithHashPassword)

    const accessToken = await generateAccessToken(newUser.id)
    const refreshToken = await generateRefreshToken(newUser.id)

    return {accessToken, refreshToken}
  }
}