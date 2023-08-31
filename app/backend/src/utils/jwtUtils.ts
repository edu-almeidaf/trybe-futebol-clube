import { JwtPayload, Secret, SignOptions, verify, sign } from 'jsonwebtoken';

export default class Jwt {
  private static secret: Secret = process.env.JWT_SECRET || 'jwt_secret';

  private static jwtConfig: SignOptions = {
    algorithm: 'HS256', expiresIn: '1h',
  };

  static sign(payload: JwtPayload): string {
    return sign(payload, Jwt.secret, Jwt.jwtConfig);
  }

  static verify(token: string): JwtPayload | string {
    try {
      return verify(token, Jwt.secret) as JwtPayload;
    } catch (error) {
      return 'Token must be a valid token';
    }
  }
}
