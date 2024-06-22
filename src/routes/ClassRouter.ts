import ClassController from "../controllers/ClassController";
import authValidator from "../middlewares/authValidator";
import schemaValidator from "../middlewares/schemaValidator";
import { DeleteSchema } from "../schemas/BaseSchema";
import { SubjectClassSchema, UserClassSchema, createClassSchema, updateClassSchema } from "../schemas/ClassSchema";
import BaseRouter from "./BaseRouter";

class ClassRouter extends BaseRouter {
  routes() {
    this.router.post('/', authValidator(0), schemaValidator(createClassSchema), ClassController.create);
    this.router.post('/add/user', authValidator(1), schemaValidator(UserClassSchema), ClassController.addUser);
    this.router.post('/add/subject', authValidator(1), schemaValidator(SubjectClassSchema), ClassController.addSubject);
    this.router.patch('/:id', authValidator(0), schemaValidator(updateClassSchema), ClassController.update);
    this.router.delete('/remove/user', authValidator(1), schemaValidator(UserClassSchema), ClassController.removeUser);
    this.router.delete('/remove/subject', authValidator(1), schemaValidator(SubjectClassSchema), ClassController.removeSubject);
    this.router.delete('/:id', authValidator(0), schemaValidator(DeleteSchema), ClassController.delete);
    this.router.get('/', authValidator(2), ClassController.findAll);
    this.router.get('/:id', authValidator(2), ClassController.findOne);
  }
}

export default new ClassRouter().router;
