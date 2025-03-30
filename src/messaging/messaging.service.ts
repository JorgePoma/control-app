import { Injectable } from '@nestjs/common';
import { ClientProxyHelper } from 'src/common/proxy/cliente-proxy';
import { UserMSG } from 'src/common/constants';
import { Types } from 'mongoose';

@Injectable()
export class MessagingService {

  constructor(private readonly clientProxy: ClientProxyHelper) { }
  private _clientProxyService = this.clientProxy.clientProxyUsers();

  validateUser(id: Types.ObjectId) {
    return this._clientProxyService.send(UserMSG.VALIDATE_USER, id);
  }
  
}
