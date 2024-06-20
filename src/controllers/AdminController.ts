import { Request, Response } from "express";

export default class AdminController {
  async create(req: Request, res: Response) {
    try {
      const { name, cpf, birthdate, password } = req.body;


    } catch(err: unknown) {
      
    }
  }
}
