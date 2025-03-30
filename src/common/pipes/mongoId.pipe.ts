
import { PipeTransform, Injectable, BadRequestException, Logger } from '@nestjs/common';
import { Types, isValidObjectId } from 'mongoose';

@Injectable()
export class MongoIdPipe implements PipeTransform {
  transform(value: string): Types.ObjectId {
    try {
      if (!isValidObjectId(value)) {
        throw new BadRequestException(`${value} no es un id valido`);
      }
      return new Types.ObjectId(`${value}`);
    } catch (error) {
      Logger.error(error);
      throw new BadRequestException(`No se puede validar ${value}`);
    }
  }
}
