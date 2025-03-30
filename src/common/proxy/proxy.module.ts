import { Module } from '@nestjs/common';
import { ClientProxyHelper} from './cliente-proxy';

@Module({
    providers: [ClientProxyHelper],
    exports: [ClientProxyHelper],
})
export class ProxyModule {};