import { Request, Response } from "express";
import errorHandler from "../utils/errorHandler";
import Class from "../models/Class";
import ClassRepository from "../repository/ClassRepository";

class ClassController {
  async create(req: Request, res: Response) {
    try {
      const { name } = req.body;

      const newClass = await ClassRepository.create(new Class({
        name
      }));

      return res.status(200).json({
        message: 'Class has been created successfully',
        data: newClass
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
      const { name } = req.body;

      const updatedClass = await ClassRepository.update(parseInt(id), new Class({ name }));

      return res.status(200).json({
        message: 'This class has been updated successfully',
        data: updatedClass
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
      const { id } = req.params;

      await ClassRepository.delete(parseInt(id));

      return res.status(200).json({
        message: 'This class has been deleted successfully'
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
      const classes = await ClassRepository.find();

      return res.status(200).json({
        message: 'Class data has been fetched successfully',
        data: classes
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
      const { id } = req.params;

      const oneClass = await ClassRepository.findOne(parseInt(id));

      return res.status(200).json({
        message: 'Class data has been fetched successfully',
        data: oneClass
      });
    } catch(err: unknown) {
      return res.status(500).json({
        status: 'Internal server error',
        message: errorHandler(err)
      });
    }
  }
}

export default new ClassController();
