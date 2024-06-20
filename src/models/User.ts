import { BelongsToMany, Column, Model, Table, DataType as dt } from "sequelize-typescript";
import Class from "./Class";

@Table({
  tableName: 'user'
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
    allowNull: false,
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

  @BelongsToMany(() => Class, {
    through: 'Class_User' 
  }) classes!: Class[];
}
