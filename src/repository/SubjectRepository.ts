import Subject from "../models/Subject";
import { BaseRepository } from "./BaseRepository";

export default class SubjectRepository extends BaseRepository<Subject> {
  async create(entity: Subject): Promise<Subject> {
    return await Subject.create({
      name: entity.name
    });
  }

  async update(id: number, updatedEntity: Subject): Promise<Subject> {
    const oldSubject = await Subject.findByPk(id);
    
    if(!oldSubject) {
      throw new Error('Subject not found');
    }

    oldSubject.name = updatedEntity.name;

    return await oldSubject.save();
  }

  async delete(id: number): Promise<void> {
    const oldSubject = await Subject.findByPk(id);
    
    if(!oldSubject) {
      throw new Error('Subject not found');
    }

    await oldSubject.destroy();
  }

  async find(): Promise<Subject[]> {
    return await Subject.findAll();    
  }

  async findOne(id: number): Promise<Subject> {
    const subject = await Subject.findByPk(id);
    
    if(!subject) {
      throw new Error('Subject not found');
    }

    return subject;
  }
}
