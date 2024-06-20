import { BelongsToMany, Column, Model, Table, DataType as dt } from "sequelize-typescript";
import Class from "./Class";
import ClassSubject from "./ClassSubject";

@Table({
  tableName: 'subjects'
})
export default class Subject extends Model {
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

  @BelongsToMany(() => Class, {
    through: {
      model: () => ClassSubject
    }
  }) classes!: Class[];
}
