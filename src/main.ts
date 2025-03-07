import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API de Usuários')
    .setDescription('CRUD de usuários utilizando NestJS')
    .setVersion('1.0')
    .addBearerAuth() // Para autenticação via JWT, se necessário
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // A documentação estará disponível em /api

  // Ativa a validação global para todos os DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,   // Remove propriedades não definidas no DTO
    forbidNonWhitelisted: true, // Retorna erro se houver propriedades não permitidas
    transform: true,   // Converte os tipos automaticamente
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
