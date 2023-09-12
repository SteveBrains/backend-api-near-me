import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema()
export class Search {
  @Field({ nullable: true })
  @Prop()
  name: string;
}

export type TSearch = Search & Document;
export const SearchSchema = SchemaFactory.createForClass(Search);
