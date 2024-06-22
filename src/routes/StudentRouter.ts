import StudentController from "../controllers/StudentController";
import schemaValidator from "../middlewares/schemaValidator";
import { DeleteSchema } from "../schemas/BaseSchema";
import { createUserSchema, updateUserSchema } from "../schemas/UserSchema";
import BaseRouter from "./BaseRouter";

class StudentRouter extends BaseRouter {
  routes() {
    this.router.post('/', schemaValidator(createUserSchema), StudentController.create);
    this.router.patch('/:id', schemaValidator(updateUserSchema), StudentController.update);
    this.router.delete('/:id', schemaValidator(DeleteSchema), StudentController.delete);
    this.router.get('/', StudentController.findAll);
    this.router.get('/:id', StudentController.findOne);
  }
}

export default new StudentRouter().router;
