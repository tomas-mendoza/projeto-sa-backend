import Class from "../models/Class";
import ClassSubject from "../models/ClassSubject";
import ClassUser from "../models/ClassUser";
import Subject from "../models/Subject";
import User from "../models/User";
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
    return await Class.findAll({
      include: [
        {
          model: User
        },
        {
          model: Subject
        }
      ]
    });    
  }

  async findOne(id: number): Promise<Class> {
    const classToFind = await Class.findByPk(id, {
      include: [
        {
          model: User
        },
        {
          model: Subject
        }
      ]
    });    

    if(!classToFind) {
      throw new Error('Class not found');
    }
    
    return classToFind;
  }

  async addUser(classId: number, userId: number): Promise<void> {
    const oneClass = await Class.findByPk(classId);

    if(!oneClass) {
      throw new Error('Class not found');
    }

    const user = await User.findByPk(userId);

    if(!user) {
      throw new Error('User not found');
    }

    const classUser = await ClassUser.findOne({
      where: {
        classId,
        userId
      }
    });

    if(classUser) {
      throw new Error('This user already belongs to this class');
    }

    await ClassUser.create({
      classId,
      userId
    });
  }

  async removeUser(classId: number, userId: number): Promise<void> {
    const oneClass = await Class.findByPk(classId);

    if(!oneClass) {
      throw new Error('Class not found');
    }

    const user = await User.findByPk(userId);

    if(!user) {
      throw new Error('User not found');
    }

    const classUser = await ClassUser.findOne({
      where: {
        classId,
        userId
      }
    });

    if(!classUser) {
      throw new Error('This user doesn\'t belong to this class');
    }

    await classUser.destroy();
  }

  async addSubject(classId: number, subjectId: number) {
    const oneClass = await Class.findByPk(classId);

    if(!oneClass) {
      throw new Error('Class not found');
    }

    const subject = await Subject.findByPk(subjectId);

    if(!subject) {
      throw new Error('Subject not found');
    }

    const classSubject = await ClassSubject.findOne({
      where: {
        subjectId,
        classId
      }
    });

    if(classSubject) {
      throw new Error('This subject already belongs to this class');
    }

    await ClassSubject.create({
      classId,
      subjectId
    });
  }

  async removeSubject(classId: number, subjectId: number) {
    const oneClass = await Class.findByPk(classId);

    if(!oneClass) {
      throw new Error('Class not found');
    }

    const subject = await Subject.findByPk(subjectId);

    if(!subject) {
      throw new Error('Subject not found');
    }

    const classSubject = await ClassSubject.findOne({
      where: {
        subjectId,
        classId
      }
    });

    if(!classSubject) {
      throw new Error('This subject doesn\'t belong to this class');
    }

    await classSubject.destroy();
  }
}

export default new ClassRepository();
