import { BelongsToMany, Column, Model, Table, DataType as dt } from "sequelize-typescript";
import User from "./User";
import ClassUser from "./ClassUser";
import Subject from "./Subject";
import ClassSubject from "./ClassSubject";

@Table({
  tableName: 'classes'
})
export default class Class extends Model {
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

  @BelongsToMany(() => User, { 
    through: {
      model: () => ClassUser
    }
  }) users!: User[];

  @BelongsToMany(() => Subject, {
    through: {
      model: () => ClassSubject
    }
  }) subjects!: Subject[];
}
