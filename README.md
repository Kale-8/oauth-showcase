# OAuth Showcase - NestJS

Demo funcional de autenticación con **JWT**, **Google OAuth2** y **Local Strategy** en NestJS.

## 🚀 Inicio Rápido

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
Copia `.env.example` a `.env` y completa las credenciales:
```bash
cp .env.example .env
```

**Importante:** Para Google OAuth2, necesitas:
1. Ir a [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Crear un proyecto OAuth 2.0
3. Configurar la URL de callback: `http://localhost:3000/api/auth/google/redirect`
4. Copiar `Client ID` y `Client Secret` al `.env`

### 3. Ejecutar la aplicación
```bash
npm run start:dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📝 Endpoints

### Google OAuth2
- **GET** `/api/auth/google` - Inicia el flujo OAuth con Google
- **GET** `/api/auth/google/redirect` - Callback de Google (automático)

### Local Strategy
- **POST** `/api/auth/login` - Login con email y password
  ```json
  {
    "email": "demo@test.com",
    "password": "demo123"
  }
  ```

### Rutas Protegidas (requieren JWT)
- **GET** `/api/auth/profile` - Obtiene el perfil del usuario autenticado
  - Header requerido: `Authorization: Bearer <token>`

## 🧪 Probar la Demo

### 1. Login Local
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@test.com","password":"demo123"}'
```

Respuesta:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": "3600s"
}
```

### 2. Acceder a ruta protegida
```bash
curl http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer <tu_access_token>"
```

### 3. Google OAuth2
Abre en el navegador: `http://localhost:3000/api/auth/google`

## 📚 Estructura del Proyecto

```
src/
  auth/
    strategies/
      jwt.strategy.ts      # Valida tokens JWT
      google.strategy.ts   # Maneja OAuth2 de Google
      local.strategy.ts    # Valida email/password
    auth.controller.ts     # Rutas HTTP
    auth.service.ts        # Lógica de negocio
    auth.module.ts         # Configuración del módulo
  app.module.ts
  main.ts
```

## 🔑 Conceptos Clave

- **Controlador**: Expone rutas HTTP y actúa como puente con la lógica
- **Guard**: Protege rutas y dirige el flujo de autenticación
- **Estrategia**: Implementación concreta de Passport (JWT, Google, Local)
- **Servicio**: Lógica central de autenticación y gestión de usuarios
- **Módulo**: Configura y registra todos los componentes

## ⚠️ Notas

- Este es un proyecto de **demo/educativo**
- Los usuarios se almacenan en memoria (se pierden al reiniciar)
- En producción, usar base de datos real y mejores prácticas de seguridad

