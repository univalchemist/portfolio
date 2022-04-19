import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { AdminType } from './admin.enum'

@Schema({ timestamps: true })
@ObjectType()
export class Admin {
  @Field(() => ID)
  id: string

  @Prop({ required: true })
  @Field({ nullable: false })
  email: string

  @Prop({ type: String, required: true })
  password: string

  @Prop({ required: false, enum: AdminType, default: AdminType.Admin })
  @Field(() => AdminType, { nullable: true, defaultValue: AdminType.Admin })
  type?: AdminType

  @Prop({ required: false })
  @Field({ nullable: true })
  tgChatId?: string // telegram chat id

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}

export const AdminSchema = SchemaFactory.createForClass(Admin)
export type AdminDocument = Admin & Document
