import { BeforeCreate, BeforeUpdate, BelongsToMany, Column, Model, Table, DataType as dt } from "sequelize-typescript";
import Class from "./Class";
import ClassUser from "./ClassUser";
import { hash, compare } from "bcrypt";

@Table({
  tableName: 'users'
})
export default class User extends Model {
  @Column({
    type: dt.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  }) id!: number;
  
  @Column({
    type: dt.STRING,
    allowNull: false
  }) name!: string;

  @Column({
    type: dt.STRING(11),
    allowNull: false
  }) cpf!: string;

  @Column({
    type: dt.DATE,
    allowNull: false
  }) birthdate!: string;

  @Column({
    type: dt.INTEGER,
    defaultValue: 2
  }) permission_level!: number;

  @Column({
    type: dt.STRING,
    allowNull: false
  }) password!: string;

  @BelongsToMany(() => Class, {
    through: {
      model: () => ClassUser
    }
  }) classes!: Class[];

  @BeforeCreate
  @BeforeUpdate
  static async encryptPassword(entity: User) {
    if(entity.changed('password')) {
      const passwordHash = await hash(entity.password, 8);
      entity.password = passwordHash;
    }
  }

  async comparePassword(password: string) {
    return await compare(password, this.password);
  }
}
