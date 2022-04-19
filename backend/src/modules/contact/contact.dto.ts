import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { User } from '@modules/user/user.dto'
import { ExternalLink } from '@modules/shared/types'

@Schema({ timestamps: true })
@ObjectType()
export class Contact {
  @Field(() => ID)
  id: string

  @Prop({ required: true })
  @Field({ nullable: false })
  userId: string

  @Prop({ required: true })
  userAdminId: string // admin who created the user

  @Prop({ type: User, required: false })
  @Field(() => User, { nullable: true })
  user?: Partial<User>

  @Prop({ required: false })
  @Field({ nullable: true })
  name?: string

  @Prop({ required: true })
  @Field({ nullable: false })
  email: string

  @Prop({ required: false })
  @Field({ nullable: true })
  message?: string

  @Prop({ required: true })
  @Field(() => Boolean, { nullable: false })
  seen: boolean

  @Prop({ required: false })
  @Field(() => ExternalLink, { nullable: true })
  ref?: ExternalLink

  @Prop({ type: String, required: true })
  key: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}

export const ContactSchema = SchemaFactory.createForClass(Contact)
export type ContactDocument = Contact & Document
