import Class from "../models/Class";
import User from "../models/User";
import { BaseRepository } from "./BaseRepository";

class UserRepository extends BaseRepository<User> {
  async create(entity: User): Promise<User> {
    return await User.create({
      name: entity.name,
      cpf: entity.cpf,
      birthdate: entity.birthdate,
      permission_level: entity.permission_level,
      password: entity.password
    });
  }

  async update(id: number, updatedEntity: User): Promise<User> {
    const oldUser = await User.findByPk(id);
    
    if(!oldUser) {
      throw new Error('User not found');
    }

    oldUser.name = updatedEntity.name;
    oldUser.cpf = updatedEntity.cpf;
    oldUser.birthdate = updatedEntity.birthdate;
    
    if(updatedEntity.password) {
      oldUser.password = updatedEntity.password;
    }

    return await oldUser.save();
  }

  async delete(id: number, permission_level: number = 2): Promise<void> {
    const oldUser = await User.findOne({
      where: {
        id,
        permission_level
      }
    });

    if(!oldUser) {
      throw new Error('User not found');
    }

    await oldUser.destroy();
  }

  async find(permission_level: number = 2): Promise<User[]> {
    return await User.findAll({
      where: {
        permission_level
      },
      include: {
        model: Class
      }
    });    
  }

  async findOne(id: number, permission_level: number = 2): Promise<User> {
    const user = await User.findOne({
      where: {
        id,
        permission_level
      },
      include: {
        model: Class
      }
    });
    
    if(!user) {
      throw new Error('User not found');
    }

    return user;
  }
}

export default new UserRepository();
