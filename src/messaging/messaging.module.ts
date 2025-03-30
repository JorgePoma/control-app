import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  providers: [MessagingService],
  exports: [MessagingService],
})
export class MessagingModule {}
