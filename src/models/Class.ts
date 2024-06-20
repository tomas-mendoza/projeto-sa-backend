import { BelongsToMany, Column, Model, Table, DataType as dt } from "sequelize-typescript";
import User from "./User";

@Table({
  tableName: 'class'
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
    allowNull: false,
  }) name!: string;

  @BelongsToMany(() => User, { 
    through: 'Class_User' 
  }) users!: User[];
}
