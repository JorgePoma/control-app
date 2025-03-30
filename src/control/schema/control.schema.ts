import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ControlDocument = HydratedDocument<Control> & {
    createdAt: Date;
    updatedAt: Date;
};

/**
 * * Control schema
 * * @description schema para el control de entrada y salida de los usuarios al trabajo
 */

@Schema({ timestamps: true, versionKey: false })
export class Control { 
    @Prop({ required: true, type: String })
    userId: string;

    @Prop({ required: true, type: String })
    type: string;
}

export const ControlSchema = SchemaFactory.createForClass(Control);