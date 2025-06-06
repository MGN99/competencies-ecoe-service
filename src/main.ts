import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const frontendUrl = configService.get<string>('FRONTEND_URL') || 'http://localhost:5173';

    app.enableCors({
        origin: frontendUrl,
    });

    app.connectMicroservice<MicroserviceOptions>({
            transport: Transport.RMQ,
            options: {
            urls: [process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672'],
            queue: 'competencies_ecoe_queue',
            queueOptions: { durable: true },
        },
    });
    
    app.useGlobalPipes(new ValidationPipe());
    await app.startAllMicroservices();

    await app.listen(3002);
}
bootstrap();
