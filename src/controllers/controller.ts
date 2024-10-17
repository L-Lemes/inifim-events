import { Request, Response, NextFunction } from "express"
import { IBaseModel } from "../repositories/repository.js"


interface IBaseController {
  handle(req: Request, res: Response, next: NextFunction): void
}

export abstract class BaseController implements IBaseController{
  abstract handle(req: Request, res: Response, next: NextFunction): Promise<void>
}