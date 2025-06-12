import { Document } from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      user?: Document & {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
      };
    }
  }
} 