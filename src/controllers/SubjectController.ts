import { Request, Response } from "express";
import errorHandler from "../utils/errorHandler";
import SubjectRepository from "../repository/SubjectRepository";
import Subject from "../models/Subject";

class ClassController {
  async create(req: Request, res: Response) {
    try {
      const { name } = req.body;

      const newSubject = await SubjectRepository.create(new Subject({
        name
      }));

      return res.status(200).json({
        message: 'Subject has been created successfully',
        data: newSubject
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

      const updatedSubject = await SubjectRepository.update(parseInt(id), new Subject({ name }));

      return res.status(200).json({
        message: 'This subject has been updated successfully',
        data: updatedSubject
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

      await SubjectRepository.delete(parseInt(id));

      return res.status(200).json({
        message: 'This subject has been deleted successfully'
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
      const subjects = await SubjectRepository.find();

      return res.status(200).json({
        message: 'Subject data has been fetched successfully',
        data: subjects
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

      const subject = await SubjectRepository.findOne(parseInt(id));

      return res.status(200).json({
        message: 'Subject data has been fetched successfully',
        data: subject
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
