import StudentController from "../controllers/StudentController";
import authValidator from "../middlewares/authValidator";
import schemaValidator from "../middlewares/schemaValidator";
import { DeleteSchema } from "../schemas/BaseSchema";
import { createUserSchema, updateUserSchema } from "../schemas/UserSchema";
import BaseRouter from "./BaseRouter";

class StudentRouter extends BaseRouter {
  routes() {
    this.router.post('/', authValidator(0), schemaValidator(createUserSchema), StudentController.create);
    this.router.patch('/:id', authValidator(0), schemaValidator(updateUserSchema), StudentController.update);
    this.router.delete('/:id', authValidator(0), schemaValidator(DeleteSchema), StudentController.delete);
    this.router.get('/', authValidator(0), StudentController.findAll);
    this.router.get('/:id', authValidator(0), StudentController.findOne);
  }
}

export default new StudentRouter().router;
