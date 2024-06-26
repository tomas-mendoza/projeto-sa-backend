import { Request, Response } from "express";
import User from "../models/User";
import UserRepository from "../repository/UserRepository";
import errorHandler from "../utils/errorHandler";

class AdminController {
  async create(req: Request, res: Response) {
    try {
      const { name, cpf, birthdate, password } = req.body;

      const newAdmin = new User({
        name,
        cpf,
        birthdate,
        password,
        permission_level: 0
      });

      const createdAdmin = await UserRepository.create(newAdmin);

      return res.status(200).json({
        message: 'Admin has been created successfully',
        data: createdAdmin
      });
    } catch(err: unknown) {
      return res.status(500).json({
        status: 'Internal server error',
        message: errorHandler(err)
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, cpf, birthdate, password } = req.body;

      const updatedAdmin = await UserRepository.update(parseInt(id), new User({
        name, cpf, birthdate, password 
      }));
      
      return res.status(200).json({
        message: 'This admin has been updated successfully',
        data: updatedAdmin
      });
    } catch(err: unknown) {
      return res.status(500).json({
        status: 'Internal server error',
        message: errorHandler(err)
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await UserRepository.delete(parseInt(req.params.id), 0);

      return res.status(200).json({
        message: 'This admin has been deleted successfully'
      });
    } catch(err: unknown) {
      return res.status(500).json({
        status: 'Internal server error',
        message: errorHandler(err)
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const allAdmin = await UserRepository.find(0);

      return res.status(200).json({
        message: 'Admin data has been fetched successfully',
        data: allAdmin
      });
    } catch(err: unknown) {
      return res.status(500).json({
        status: 'Internal server error',
        message: errorHandler(err)
      });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const admin = await UserRepository.findOne(parseInt(req.params.id), 0);

      return res.status(200).json({
        message: 'Admin data has been fetched successfully',
        data: admin
      });
    } catch(err: unknown) {
      return res.status(500).json({
        status: 'Internal server error',
        message: errorHandler(err)
      });
    }
  }
}

export default new AdminController();
