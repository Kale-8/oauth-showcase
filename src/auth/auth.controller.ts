import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Inicia el flujo OAuth con Google
  // El guard redirige automáticamente a Google
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Este código nunca se ejecuta, Passport redirige a Google
  }

  // Callback de Google después del login
  // Google redirige aquí y Passport ejecuta GoogleStrategy.validate
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleRedirect(@Req() req: any) {
    // req.user viene de GoogleStrategy.validate
    return this.authService.createToken(req.user);
  }

  // Login con Local Strategy (email y password)
  // El guard ejecuta LocalStrategy.validate automáticamente
  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req: any) {
    // req.user viene de LocalStrategy.validate
    return this.authService.createToken(req.user);
  }

  // Ruta protegida: requiere JWT válido en el header
  // El guard ejecuta JwtStrategy.validate automáticamente
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req: any) {
    // req.user viene de JwtStrategy.validate
    return req.user;
  }
}

