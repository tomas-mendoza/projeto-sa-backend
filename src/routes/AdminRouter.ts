import AdminController from "../controllers/AdminController";
import authValidator from "../middlewares/authValidator";
import schemaValidator from "../middlewares/schemaValidator";
import { DeleteSchema } from "../schemas/BaseSchema";
import { createUserSchema, updateUserSchema } from "../schemas/UserSchema";
import BaseRouter from "./BaseRouter";

class AdminRouter extends BaseRouter {
  routes() {
    this.router.post('/', authValidator(0), schemaValidator(createUserSchema), AdminController.create);
    this.router.patch('/:id', authValidator(0), schemaValidator(updateUserSchema), AdminController.update);
    this.router.delete('/:id', authValidator(0), schemaValidator(DeleteSchema), AdminController.delete);
    this.router.get('/', authValidator(0), AdminController.findAll);
    this.router.get('/:id', authValidator(0), AdminController.findOne);
  }
}

export default new AdminRouter().router;
