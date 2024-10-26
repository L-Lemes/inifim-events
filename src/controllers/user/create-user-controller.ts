import { Request, Response, NextFunction } from "express";
import { CreateUserUseCase } from "../../use-cases/user/create-user-use-case.js";

export class CreateUserController{
  constructor(private createUserUseCase: CreateUserUseCase){}

  handle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { data } = req.body
    try {
      const newUser = await this.createUserUseCase.execute(data)
      res.status(201).json(newUser)
    } catch (err) {
      if(err instanceof Error) res.status(400).json(err.message)
    }

  }
}