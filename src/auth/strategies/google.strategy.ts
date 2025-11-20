import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as GoogleOAuthStrategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(GoogleOAuthStrategy, 'google') {
  constructor(private authService: AuthService, private configService: ConfigService) {
    super({
      // Credenciales de Google OAuth (desde .env)
      clientID: configService.get<string>('GOOGLE_CLIENT_ID', ''),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET', ''),
      callbackURL: configService.get<string>(
        'GOOGLE_CALLBACK_URL',
        'http://localhost:3000/api/auth/google/redirect',
      ),
      // Permisos solicitados a Google
      scope: ['email', 'profile'],
    });
  }

  // Se ejecuta cuando Google redirige después del login
  // profile contiene la información del usuario de Google
  async validate(accessToken: string, refreshToken: string, profile: any) {
    const email = profile?.emails?.[0]?.value;
    const name = profile?.displayName;

    // Busca o crea el usuario en nuestra "base de datos"
    const user = await this.authService.findOrCreate({ email, name });
    // Retorna el usuario que estará disponible en req.user
    return user;
  }
}

