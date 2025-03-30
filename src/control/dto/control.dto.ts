import { Types } from "mongoose";
import { Transform } from "class-transformer";
import { IsEnum, IsMongoId } from "class-validator";
import { BadRequestException, Logger } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { ControlType } from "./type.enum";
/**
 * DTO para crear un control de entrada o salida
 * @description Este DTO se utiliza para validar los datos de entrada al crear un nuevo control
 */
export class CreateControlDto {
    @ApiProperty({
        description: 'ID del usuario que realiza el control',
        example: '63f8d2c4e4b0c3f8d2c4e4b0',
        type: String,
        required: true,
    })
    @Transform(({ value }) => {
        try {
            return new Types.ObjectId(`${value}`);
        } catch (error) {
            Logger.error(error);
            throw new BadRequestException("No se puede validar el ID del usuario");
        }
    })
    @IsMongoId({message: 'El ID del usuario no es válido'})
    userId: Types.ObjectId;

    @ApiProperty({
        description: 'Tipo de control '+ Object.values(ControlType).join(', '),
        example: ControlType.IN,
        type: String,
        required: true,
    })
    @IsEnum(ControlType, {
        message: 'El tipo de control debe ser IN o OUT',
    })
    type: ControlType;
}

/**
 * DTO para la respuesta de error 400
 * @description Este DTO se utiliza para enviar una respuesta de error 400 al cliente
 */
export class BadRequestResponseDto {
    @ApiProperty({
        description: 'Código de estado HTTP',
        example: 400,
        type: Number,
    })
    statusCode: number;
    @ApiProperty({
        description: 'Mensaje de error',
        example: 'El ID del usuario no es válido',
        type: String,
    })
    message: string;
}