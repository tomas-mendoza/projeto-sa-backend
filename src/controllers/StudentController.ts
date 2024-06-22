import { Request, Response } from "express";
import User from "../models/User";
import UserRepository from "../repository/UserRepository";
import errorHandler from "../utils/errorHandler";

class StudentController {
  async create(req: Request, res: Response) {
    try {
      const { name, cpf, birthdate, password } = req.body;

      const newStudent = new User({
        name,
        cpf,
        birthdate,
        password,
        permission_level: 2
      });

      const createdStudent = await UserRepository.create(newStudent);

      return res.status(200).json({
        message: 'Student has been created successfully',
        data: createdStudent
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

      const updatedStudent = await UserRepository.update(parseInt(id), new User({
        name, cpf, birthdate, password 
      }));
      
      return res.status(200).json({
        message: 'This student has been updated successfully',
        data: updatedStudent
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
      await UserRepository.delete(parseInt(req.params.id), 2);

      return res.status(200).json({
        message: 'This student has been deleted successfully'
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
      const allStudent = await UserRepository.find(2);

      return res.status(200).json({
        message: 'Student data has been fetched successfully',
        data: allStudent
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
      const student = await UserRepository.findOne(parseInt(req.params.id), 2);

      return res.status(200).json({
        message: 'Student data has been fetched successfully',
        data: student
      });
    } catch(err: unknown) {
      return res.status(500).json({
        status: 'Internal server error',
        message: errorHandler(err)
      });
    }
  }
}

export default new StudentController();
