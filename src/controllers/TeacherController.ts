import { Request, Response } from "express";
import User from "../models/User";
import UserRepository from "../repository/UserRepository";
import errorHandler from "../utils/errorHandler";

class TeacherController {
  async create(req: Request, res: Response) {
    try {
      const { name, cpf, birthdate, password } = req.body;

      const newTeacher = new User({
        name,
        cpf,
        birthdate,
        password,
        permission_level: 1
      });

      const createdTeacher = await UserRepository.create(newTeacher);

      return res.status(200).json({
        message: 'Teacher has been created successfully',
        data: createdTeacher
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

      const updatedTeacher = await UserRepository.update(parseInt(id), new User({
        name, cpf, birthdate, password 
      }));
      
      return res.status(200).json({
        message: 'This teacher has been updated successfully',
        data: updatedTeacher
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
      await UserRepository.delete(parseInt(req.params.id), 1);

      return res.status(200).json({
        message: 'This Teacher has been deleted successfully'
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
      const allTeacher = await UserRepository.find(1);

      return res.status(200).json({
        message: 'Teacher data has been fetched successfully',
        data: allTeacher
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
      const teacher = await UserRepository.findOne(parseInt(req.params.id), 1);

      return res.status(200).json({
        message: 'Teacher data has been fetched successfully',
        data: teacher
      });
    } catch(err: unknown) {
      return res.status(500).json({
        status: 'Internal server error',
        message: errorHandler(err)
      });
    }
  }
}

export default new TeacherController();
