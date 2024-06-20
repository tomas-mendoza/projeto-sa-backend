import User from "../models/User";
import { BaseRepository } from "./BaseRepository";

export default class UserRepository extends BaseRepository<User> {
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
    oldUser.password = updatedEntity.password;

    return await oldUser.save();
  }

  async delete(id: number): Promise<void> {
    const oldUser = await User.findByPk(id);

    if(!oldUser) {
      throw new Error('User not found');
    }

    await oldUser.destroy();
  }

  async find(): Promise<User[]> {
    return await User.findAll();    
  }

  async findOne(id: number): Promise<User> {
    const user = await User.findByPk(id);
    
    if(!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
