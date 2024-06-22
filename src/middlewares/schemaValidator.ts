import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

const schemaValidator = (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {

      await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query
      });

      next();
    } catch(err: unknown) {
      if(err instanceof ZodError) {
        const errors = err.issues.map((err) => err.path[1]);

        return res.status(400).json({
          status: 'Client error',
          message: 'Validation error',
          invalid_values: errors
        });
      }

      return res.status(500).json({
        status: 'Internal server error',
        error: err
      });
    }
  }

export default schemaValidator;
