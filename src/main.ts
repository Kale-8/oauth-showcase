import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Prefijo global para todas las rutas
  app.setGlobalPrefix('api');
  
  // Habilita CORS para desarrollo
  app.enableCors();
  
  await app.listen(3000);
  console.log('🚀 Aplicación corriendo en http://localhost:3000');
  console.log('📝 Endpoints disponibles:');
  console.log('   - GET  /api/auth/google (inicia OAuth)');
  console.log('   - POST /api/auth/login (login local)');
  console.log('   - GET  /api/auth/profile (ruta protegida)');
}
bootstrap();

