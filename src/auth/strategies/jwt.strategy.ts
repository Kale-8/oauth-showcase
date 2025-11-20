import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      // Extrae JWT del header Authorization: Bearer <token>
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Secret para verificar la firma del token
      secretOrKey: process.env.JWT_SECRET || 'fallback_secret_demo',
    });
  }

  // Valida el payload del JWT y retorna el usuario
  // Este objeto estará disponible en req.user en rutas protegidas
  async validate(payload: any) {
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
    };
  }
}

