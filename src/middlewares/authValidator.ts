import { NextFunction, Request, Response } from "express";
import errorHandler from "../utils/errorHandler";
import env from "../env";
import jwt, { JwtPayload } from 'jsonwebtoken';

const authValidator = (permission_level: number = 2) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if(!req.headers.authorization && !req.cookies.auth) {
        throw new Error('Authorization can not be null!');
      }
  
      const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : req.cookies.auth;
      
      const data = jwt.verify(token, env.SECRET_KEY) as JwtPayload;

      console.log(data.permission_level);

      if(data.permission_level !== permission_level) {
        throw new Error('Not authorized');
      }

      next();
    } catch(err: unknown) {
      return res.status(500).json({
        status: 'Internal server error',
        message: errorHandler(err)
      })
    }
  }

export default authValidator;
