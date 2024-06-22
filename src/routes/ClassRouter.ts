import ClassController from "../controllers/ClassController";
import authValidator from "../middlewares/authValidator";
import schemaValidator from "../middlewares/schemaValidator";
import { DeleteSchema } from "../schemas/BaseSchema";
import { createClassSchema, updateClassSchema } from "../schemas/ClassSchema";
import BaseRouter from "./BaseRouter";

class ClassRouter extends BaseRouter {
  routes() {
    this.router.post('/', authValidator(0), schemaValidator(createClassSchema), ClassController.create);
    this.router.patch('/:id', authValidator(0), schemaValidator(updateClassSchema), ClassController.update);
    this.router.delete('/:id', authValidator(0), schemaValidator(DeleteSchema), ClassController.delete);
    this.router.get('/', authValidator(2), ClassController.findAll);
    this.router.get('/:id', authValidator(2), ClassController.findOne);
  }
}

export default new ClassRouter().router;
