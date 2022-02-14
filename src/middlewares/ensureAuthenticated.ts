import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    // if (exp < Date.now()) {
    //   throw new Error('JWT token expired');
    // }

    request.user = {
      id: sub,
    };

    next();
  } catch {
    throw new Error('Invlid JWT token');
  }
}
