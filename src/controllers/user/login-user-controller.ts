import { NextFunction, Request, Response } from 'express';
import { LoginUserUseCase } from '../../use-cases/user/login-user-use-case.js';

export class LoginUserControler {
  constructor(private loginUserUseCase: LoginUserUseCase){}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    
    try {
      const {accessToken, refreshToken } = await this.loginUserUseCase.execute(email, password);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 3600 * 1000 //1w
      });

      res.json({ accessToken });
    } catch (error) {
      if(error instanceof Error) res.status(401).json({ message: error.message });
    }
  };
}