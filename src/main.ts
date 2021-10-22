import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyHelmet from 'fastify-helmet';
import { AppModule } from './app.module';
import { setupSwagger } from './_bootstrap/setup';
import { CustomValidationPipe } from './_bootstrap/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { logger: ['log', 'error', 'warn'] },
  );
  app.enableCors();
  app.setGlobalPrefix('web/api/v1');
  app.useGlobalPipes(new CustomValidationPipe());

  setupSwagger(app);

  await app.register(fastifyHelmet, {
    contentSecurityPolicy: false,
  });
  await app.listen(process.env.APP_PORT, '0.0.0.0');
}
bootstrap();
