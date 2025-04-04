import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RabbitMQ } from './common/constants';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Microservicio Control')
    .setDescription('Esta es la API del microservicio de control de asistencia')
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'api-Key', in: 'header' }, 'api-Key')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document,
    {
      swaggerOptions: {
        filter: true,
      }
    });

  app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.AMQP_URL],
        queue: RabbitMQ.UsersQueue,
      }
    },
  );

  await app.startAllMicroservices()
  .then(() => Logger.log('Microservicio conectado correctamente', 'Bootstrap'))
  .catch((err) => Logger.error('Error al conectar el microservicio', err, 'Bootstrap'));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
