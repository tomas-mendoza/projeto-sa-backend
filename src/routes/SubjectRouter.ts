import SubjectController from "../controllers/SubjectController";
import authValidator from "../middlewares/authValidator";
import schemaValidator from "../middlewares/schemaValidator";
import { DeleteSchema } from "../schemas/BaseSchema";
import { createSubjectSchema, updateSubjectSchema } from "../schemas/SubjectSchema";
import BaseRouter from "./BaseRouter";

class SubjectRouter extends BaseRouter {
  routes() {
    this.router.post('/', authValidator(0), schemaValidator(createSubjectSchema), SubjectController.create);
    this.router.patch('/:id', authValidator(0), schemaValidator(updateSubjectSchema), SubjectController.update);
    this.router.delete('/:id', authValidator(0), schemaValidator(DeleteSchema), SubjectController.delete);
    this.router.get('/', SubjectController.findAll);
    this.router.get('/:id', SubjectController.findOne);
  }
}

export default new SubjectRouter().router;
