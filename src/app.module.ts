import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ControlModule } from './control/control.module';
import { MessagingModule } from './messaging/messaging.module';
import { ProxyModule } from './common/proxy/proxy.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseModule.forRoot(process.env.URI_MONGODB, {
      dbName: process.env.DB_NAME,
    }),
    ControlModule,
    MessagingModule,
    ProxyModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
