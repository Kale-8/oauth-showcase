import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    // Por defecto passport-local espera 'username' y 'password'
    // Configuramos para usar 'email' en lugar de 'username'
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  // Valida las credenciales (email y password)
  // Se ejecuta automáticamente cuando se usa AuthGuard('local')
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    // Retorna el usuario que estará disponible en req.user
    return user;
  }
}

