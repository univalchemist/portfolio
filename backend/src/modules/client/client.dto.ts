import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { Image } from '@modules/shared/types'

@Schema({ timestamps: true })
@ObjectType()
export class Client {
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
  name: string

  @Prop({ required: false })
  @Field({ nullable: true })
  clientInfo?: string

  @Prop({ required: false })
  @Field({ nullable: true })
  logo?: Image

  @Prop({ required: false })
  @Field({ nullable: true })
  url?: string

  @Prop({ required: false })
  @Field({ nullable: true })
  feedback?: string

  @Prop({ required: true })
  @Field(() => Boolean, { nullable: false })
  visible: boolean

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}

export const ClientSchema = SchemaFactory.createForClass(Client)
export type ClientDocument = Client & Document
