import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema()
export class __name__(pascalCase) {
  @Field({ nullable: true })
  @Prop()
  name: string;
}

export type T__name__(pascalCase) = __name__(pascalCase) & Document;
export const __name__(pascalCase)Schema = SchemaFactory.createForClass(__name__(pascalCase));
