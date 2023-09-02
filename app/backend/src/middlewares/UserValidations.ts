import { Request, Response, NextFunction } from 'express';
import Jwt from '../utils/jwtUtils';

class UserValidations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const BearerToken = req.headers.authorization;

    if (!BearerToken) return res.status(401).json({ message: 'Token not found' });

    const token = BearerToken.split(' ')[1] || BearerToken;

    const validToken = Jwt.verify(token);

    if (validToken === 'Token must be a valid token') {
      return res.status(401).json({ message: validToken });
    }

    req.body = { user: validToken };

    next();
  }
}

export default UserValidations;
