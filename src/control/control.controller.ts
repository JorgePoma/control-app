import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ControlService } from './control.service';
import { BadRequestResponseDto, CreateControlDto } from './dto/control.dto';
import { MongoIdPipe } from 'src/common/pipes/mongoId.pipe';
import { Types } from 'mongoose';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Control')
@Controller('api/v1/control')
export class ControlController {
  constructor(private readonly controlService: ControlService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar un control', description: 'Registrar un control' })
  @ApiBody({ type: CreateControlDto })
  @ApiOkResponse({ description: 'Control registrado', type: CreateControlDto })
  @ApiBadRequestResponse({
    description: 'Error: Bad Request',
    type: BadRequestResponseDto,
  })
  create(@Body() createControlDto: CreateControlDto) {
    return this.controlService.create(createControlDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los controles', description: 'Listar todos los controles' })
  @ApiBody({ type: CreateControlDto })
  @ApiOkResponse({ description: 'Lista de controles', type: CreateControlDto, isArray: true })
  findAll() {
    return this.controlService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un control por ID', description: 'Obtener un control por ID' })
  @ApiParam({ name: 'id', description: 'ID del control', type: String })
  @ApiOkResponse({ description: 'Control encontrado', type: CreateControlDto })
  findOne(@Param('id', MongoIdPipe) id: Types.ObjectId) {
    return this.controlService.findOne(id);
  }

}
