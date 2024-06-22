import Class from "../models/Class";
import { BaseRepository } from "./BaseRepository";

class ClassRepository extends BaseRepository<Class> {
  async create(entity: Class): Promise<Class> {
    return await Class.create({
      name: entity.name,
      users: entity.users,
      subjects: entity.subjects
    });
  }

  async update(id: number, updatedEntity: Class): Promise<Class> {
    const oldClass = await Class.findByPk(id);
    
    if(!oldClass) {
      throw new Error('Class not found');
    }

    oldClass.name = updatedEntity.name;
    oldClass.users = updatedEntity.users;
    oldClass.subjects = updatedEntity.subjects;

    return await oldClass.save();
  }

  async delete(id: number): Promise<void> {
    const oldClass = await Class.findByPk(id);
    
    if(!oldClass) {
      throw new Error('Class not found');
    }

    await oldClass.destroy();
  }

  async find(): Promise<Class[]> {
    return await Class.findAll();    
  }

  async findOne(id: number): Promise<Class> {
    const classToFind = await Class.findByPk(id);    

    if(!classToFind) {
      throw new Error('Class not found');
    }
    
    return classToFind;
  }
}

export default new ClassRepository();
