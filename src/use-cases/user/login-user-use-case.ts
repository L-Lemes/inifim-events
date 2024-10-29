import { compare } from "bcrypt"

import { UserRepository } from "../../repositories/user/user-repository.js"

import { generateAccessToken } from "../../utils/generate-jwt.js"
import { generateRefreshToken } from "../../utils/generate-refresh-jwt.js"

export class LoginUserUseCase {
  constructor(private userRepository: UserRepository){}

  async execute(email: string, password: string) {

    const user = await this.userRepository.findByEmail(email)

    if(!user) throw new Error('tu n existe meu mn, sinto muito...')

    const isCorrectPassword = await compare(password, user.password)

    if(!isCorrectPassword) throw new Error('seus dados estão incorretos')
      
    const accessToken = await generateAccessToken(user.id)
    const refreshToken = await generateRefreshToken(user.id)

    return { accessToken, refreshToken}
  }
}