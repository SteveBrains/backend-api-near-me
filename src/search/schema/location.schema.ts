import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
class LocationCooridinates {
  @Field(() => [Number], { nullable: true })
  @Prop({ index: true })
  coordinates: number[];
}

@ObjectType()
@Schema({
  collection: 'location',
})
export class Location {
  @Field({ nullable: true })
  @Prop({ index: true })
  street: string;
  @Field({ nullable: true })
  @Prop()
  city: string;
  @Field({ nullable: true })
  @Prop()
  state: string;
  @Field({ nullable: true })
  @Prop()
  postcode: string;
  @Field({ nullable: true })
  @Prop()
  region: string;

  @Field(() => LocationCooridinates, { nullable: true })
  @Prop({ type: LocationCooridinates })
  location: LocationCooridinates;
}

export type TLocation = Location & Document;
export const LocationSchema = SchemaFactory.createForClass(Location);
LocationSchema.index({ location: '2dsphere' });
