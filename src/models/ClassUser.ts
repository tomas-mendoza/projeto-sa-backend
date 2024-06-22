import { ForeignKey, Model, Table } from "sequelize-typescript";
import User from "./User";
import Class from "./Class";

@Table({
  tableName: 'classes_users'
})
export default class ClassUser extends Model {
  @ForeignKey(
    () => User
  ) userId!: number;

  @ForeignKey(
    () => Class
  ) classId!: number;
}
