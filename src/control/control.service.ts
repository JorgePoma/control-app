import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateControlDto } from './dto/control.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Control, ControlDocument } from './schema/control.schema';
import { Model, Types } from 'mongoose';
import { MessagingService } from 'src/messaging/messaging.service';
import { catchError, lastValueFrom } from 'rxjs';
import { ControlType } from './dto/type.enum';

@Injectable()
export class ControlService {

  constructor(
    @InjectModel(Control.name) private readonly controlModel: Model<ControlDocument>,
    private readonly messagingService: MessagingService
  ) { }

  async create(createControlDto: CreateControlDto) {
    const { userId } = createControlDto;
    await this.validateUser(userId);
    await this.validateState(userId);
    return await this.controlModel.create(createControlDto);
  }

  async validateUser(id: Types.ObjectId) {
    return lastValueFrom(this.messagingService.validateUser(id)
      .pipe(
        catchError((err) => {
          throw new HttpException(err, HttpStatus.BAD_REQUEST);
        })
      )
    )
  }

  async validateState(id: Types.ObjectId) {
    const currentControl = await this.controlModel
      .findOne({ userId: id })
      .sort({ createdAt: -1 })
      .exec();

    if (currentControl && currentControl.type === ControlType.IN) {
      throw new HttpException('El usuario ya ha registrado su entrada', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    return await this.controlModel.find().exec();
  }

  async findOne(id: Types.ObjectId) {
    return await this.controlModel.findById(id).exec();
  }

}
