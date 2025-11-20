import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// Tipo de usuario simple para la demo
type User = {
  id: string;
  email: string;
  password?: string; // Solo para usuarios locales
  name?: string;
};

@Injectable()
export class AuthService {
  // Demo: almacenamiento en memoria (en producción usar DB)
  private users: User[] = [
    // Usuario demo para local strategy
    { id: '1', email: 'demo@test.com', password: 'demo123', name: 'Usuario Demo' },
  ];

  constructor(private jwtService: JwtService) {}

  // Busca o crea usuario (simula DB)
  async findOrCreate(userData: Partial<User>): Promise<User> {
    let user = this.users.find((u) => u.email === userData.email);
    if (!user) {
      user = {
        id: `${Date.now()}`,
        email: userData.email!,
        name: userData.name,
        password: userData.password,
      };
      this.users.push(user);
    }
    return user;
  }

  // Valida credenciales para local strategy
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = this.users.find((u) => u.email === email && u.password === password);
    if (!user) {
      return null;
    }
    // Retorna usuario sin password
    const { password: _, ...result } = user;
    return result as User;
  }

  // Crea token JWT con payload del usuario
  async createToken(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };
    return {
      access_token: this.jwtService.sign(payload),
      expires_in: process.env.JWT_EXPIRES_IN || '3600s',
    };
  }
}

