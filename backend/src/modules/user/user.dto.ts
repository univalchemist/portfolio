import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { Image, ExternalLink } from '@modules/shared/types'

@Schema({ timestamps: true })
@ObjectType()
export class UserLink {
  @Prop({ required: true })
  @Field(() => Number, { nullable: false })
  index: number

  @Prop({ required: true })
  @Field(() => ExternalLink, { nullable: false })
  name: ExternalLink

  @Prop({ required: true })
  @Field({ nullable: false })
  url: string

  @Prop({ required: true })
  @Field(() => Boolean, { nullable: false })
  visible: boolean
}

@Schema({ timestamps: true })
@ObjectType()
export class User {
  @Field(() => ID)
  id: string

  @Prop({ required: true })
  @Field({ nullable: false })
  slug: string

  @Prop({ required: true })
  @Field({ nullable: false })
  firstName: string

  @Prop({ required: false })
  @Field({ nullable: true })
  middleName?: string

  @Prop({ required: true })
  @Field({ nullable: false })
  lastName: string

  @Prop({ required: true })
  @Field({ nullable: false })
  email: string

  @Prop({ required: false })
  @Field({ nullable: true })
  phone?: string

  @Prop({ required: false })
  @Field({ nullable: true })
  address?: string

  @Prop({ required: true })
  @Field({ nullable: false })
  title: string

  @Prop({ required: false })
  @Field({ nullable: true })
  slogan: string

  @Prop({ required: false })
  @Field(() => Image, { nullable: true })
  avatar?: Image

  @Prop({ required: true })
  @Field({ nullable: false })
  bio: string

  @Prop({ required: false })
  @Field({ nullable: true })
  availability?: string

  @Prop({ required: true })
  @Field(() => [Image], { nullable: false })
  backgroundImages: Image[]

  @Prop({ required: true })
  @Field(() => [UserLink], { nullable: false })
  links: UserLink[]

  @Prop({ required: true })
  @Field(() => Boolean, { nullable: false })
  active: boolean

  @Prop({ required: true })
  @Field({ nullable: false })
  createdBy: string // admin email

  @Prop({ required: true })
  createdById: string // admin id

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
export type UserDocument = User & Document
