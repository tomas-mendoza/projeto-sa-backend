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

  async addUser(req: Request, res: Response) {
    try {
      const { classId, userId } = req.body;

      await ClassRepository.addUser(classId, userId);

      return res.status(200).json({
        message: 'This user has been added to this class successfully'
      });
    } catch(err: unknown) {
      return res.status(500).json({
        status: 'Internal server error',
        message: errorHandler(err)
      });
    }
  }

  async removeUser(req: Request, res: Response) {
    try {
      const { classId, userId } = req.body;

      await ClassRepository.removeUser(classId, userId);

      return res.status(200).json({
        message: 'This user has been removed to this class successfully'
      });
    } catch(err: unknown) {
      return res.status(500).json({
        status: 'Internal server error',
        message: errorHandler(err)
      });
    }
  }

  async addSubject(req: Request, res: Response) {
    try {
      const { classId, subjectId } = req.body;

      await ClassRepository.addSubject(classId, subjectId);

      return res.status(200).json({
        message: 'This subject has been added to this class successfully'
      });
    } catch(err: unknown) {
      return res.status(500).json({
        status: 'Internal server error',
        message: errorHandler(err)
      });
    }
  }

  async removeSubject(req: Request, res: Response) {
    try {
      const { classId, subjectId } = req.body;

      await ClassRepository.removeSubject(classId, subjectId);

      return res.status(200).json({
        message: 'This subject has been removed to this class successfully'
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
