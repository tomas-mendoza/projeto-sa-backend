import { Request, Response } from "express";
import errorHandler from "../utils/errorHandler";
import User from "../models/User";
import jwt, { JwtPayload } from 'jsonwebtoken';
import env from "../env";

class TokenController {
  async create(req: Request, res: Response) {
    try {
      const { cpf, password } = req.body;

      const user = await User.findOne({
        where: {
          cpf
        }
      });

      if(!user) {
        throw new Error('User not found');
      }

      if(!(await user.comparePassword(password))) {
        throw new Error('Incorrect password');
      }

      const { id, permission_level } = user;

      const token = jwt.sign({ id,  cpf, permission_level }, env.SECRET_KEY, {
        expiresIn: '15d'
      });

      res.cookie('auth', token, {
        httpOnly: true,
        maxAge: 15000 * 60 * 60 * 24 //15 days
      });

      return res.json({ 
        message: 'Your session has been authenticated',
        token
      });
    } catch(err: unknown) {
      return res.status(500).json({
        status: 'Internal server error',
        message: errorHandler(err)
      });
    }
  }

  async validateToken(req: Request, res: Response) {
    try {
      if(!req.headers.authorization && !req.cookies.auth) {
        throw new Error('Authorization can not be null!');
      }
  
      const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : req.cookies.auth;
      
      const data = jwt.verify(token, env.SECRET_KEY) as JwtPayload;

      if(!data) {
        throw new Error('Not authorized');
      }

      return res.status(200).json({
        status: 'Authorized'
      });
    } catch(err: unknown) {
      return res.status(500).json({
        status: 'Internal server error',
        message: errorHandler(err)
      })
    }
  }
  
  async delete(req: Request, res: Response) {
    try {
      res.clearCookie('auth');

      res.status(200).json({
        message: 'You have been logout successfully!'
      });
    } catch(err: unknown) {
      res.status(500).json({
        status: 'Internal error server!',
        message: errorHandler(err)
      });
    }
  }
}

export default new TokenController();
