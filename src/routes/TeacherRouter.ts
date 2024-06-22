import TeacherController from "../controllers/TeacherController";
import authValidator from "../middlewares/authValidator";
import schemaValidator from "../middlewares/schemaValidator";
import { DeleteSchema } from "../schemas/BaseSchema";
import { createUserSchema, updateUserSchema } from "../schemas/UserSchema";
import BaseRouter from "./BaseRouter";

class TeacherRouter extends BaseRouter {
  routes() {
    this.router.post('/', authValidator(0), schemaValidator(createUserSchema), TeacherController.create);
    this.router.patch('/:id', authValidator(0), schemaValidator(updateUserSchema), TeacherController.update);
    this.router.delete('/:id', authValidator(0), schemaValidator(DeleteSchema), TeacherController.delete);
    this.router.get('/', authValidator(0), TeacherController.findAll);
    this.router.get('/:id', authValidator(0), TeacherController.findOne);
  }
}

export default new TeacherRouter().router;
