import { Column, Model, Table, DataType as dt } from "sequelize-typescript";

@Table({
  tableName: 'subject'
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
}
