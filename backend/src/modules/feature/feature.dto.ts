import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ timestamps: true })
@ObjectType()
export class Feature {
  @Field(() => ID)
  id: string

  @Prop({ required: true })
  @Field(() => String, { nullable: false })
  userId: string

  @Prop({ required: true })
  @Field(() => Number, { nullable: false })
  index: number

  @Prop({ required: true })
  @Field({ nullable: false })
  title: string

  @Prop({ required: false })
  @Field({ nullable: true })
  description?: string

  @Prop({ required: false })
  @Field({ nullable: true })
  icon?: string // feather icon

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}

export const FeatureSchema = SchemaFactory.createForClass(Feature)
export type FeatureDocument = Feature & Document
