import TokenController from "../controllers/TokenController";
import schemaValidator from "../middlewares/schemaValidator";
import { createTokenSchema } from "../schemas/TokenSchema";
import BaseRouter from "./BaseRouter";

class TokenRouter extends BaseRouter {
  routes() {
    this.router.post('/', schemaValidator(createTokenSchema),TokenController.create);
    this.router.delete('/', TokenController.delete);
    this.router.get('/', TokenController.validateToken);
  }
}

export default new TokenRouter().router;
