import { ForeignKey, Model, Table } from "sequelize-typescript";
import Subject from "./Subject";
import Class from "./Class";

@Table({
  tableName: 'classes_subjects'
})
export default class ClassSubject extends Model {
  @ForeignKey(
    () => Subject
  ) subjectId!: number;

  @ForeignKey(
    () => Class
  ) classId!: number;
}
