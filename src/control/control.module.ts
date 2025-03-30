import { Module } from '@nestjs/common';
import { ControlService } from './control.service';
import { ControlController } from './control.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Control, ControlSchema } from './schema/control.schema';
import { MessagingModule } from 'src/messaging/messaging.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Control.name,
        schema: ControlSchema,
      }
    ]),
    MessagingModule
  ],
  controllers: [ControlController],
  providers: [ControlService],
})
export class ControlModule {}
