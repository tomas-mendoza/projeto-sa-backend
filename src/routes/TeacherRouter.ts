import TeacherController from "../controllers/TeacherController";
import schemaValidator from "../middlewares/schemaValidator";
import { DeleteSchema } from "../schemas/BaseSchema";
import { createUserSchema, updateUserSchema } from "../schemas/UserSchema";
import BaseRouter from "./BaseRouter";

class TeacherRouter extends BaseRouter {
  routes() {
    this.router.post('/', schemaValidator(createUserSchema), TeacherController.create);
    this.router.patch('/:id', schemaValidator(updateUserSchema), TeacherController.update);
    this.router.delete('/:id', schemaValidator(DeleteSchema), TeacherController.delete);
    this.router.get('/', TeacherController.findAll);
    this.router.get('/:id', TeacherController.findOne);
  }
}

export default new TeacherRouter().router;
