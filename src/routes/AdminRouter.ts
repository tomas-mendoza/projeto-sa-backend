import AdminController from "../controllers/AdminController";
import schemaValidator from "../middlewares/schemaValidator";
import { DeleteSchema } from "../schemas/BaseSchema";
import { createUserSchema, updateUserSchema } from "../schemas/UserSchema";
import BaseRouter from "./BaseRouter";

class AdminRouter extends BaseRouter {
  routes() {
    this.router.post('/', schemaValidator(createUserSchema), AdminController.create);
    this.router.patch('/:id', schemaValidator(updateUserSchema), AdminController.update);
    this.router.delete('/:id', schemaValidator(DeleteSchema), AdminController.delete);
    this.router.get('/', AdminController.findAll);
    this.router.get('/:id', AdminController.findOne);
  }
}

export default new AdminRouter().router;
