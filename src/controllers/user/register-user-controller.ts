import { Request, Response, NextFunction } from "express";
import { RegisterUserUseCase } from "../../use-cases/user/register-user-use-case.js";

export class RegisterUserController{
  constructor(private registerUserUseCase: RegisterUserUseCase){}

  handle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { data } = req.body

    try {
      const {accessToken, refreshToken} = await this.registerUserUseCase.execute(data)

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 3600 * 1000 //1w
      });

      res.setHeader("x-access-token", accessToken);
      res.status(201).json({message: 'registro, vc foi registrado'})
    } catch (err) {
      if(err instanceof Error) res.status(400).json(err.message)
    }
  }
}