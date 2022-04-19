import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { ExternalLink } from '@modules/shared/types'

@ObjectType()
export class SettingLink {
  @Prop({ required: true })
  @Field(() => ExternalLink, { nullable: false })
  key: ExternalLink

  @Prop({ required: true })
  @Field(() => Number, { nullable: false })
  value: number
}

@ObjectType()
export class Other {
  @Prop({ required: true })
  @Field(() => String, { nullable: false })
  key: string

  @Prop({ required: true })
  @Field(() => Number, { nullable: false })
  value: number
}

@ObjectType()
export class Config {
  @Prop({ required: true })
  @Field(() => String, { nullable: false })
  dropBoxToken: string

  @Prop({ required: false })
  @Field(() => String, { nullable: true })
  telegramToken: string
}

@Schema({ timestamps: true })
@ObjectType()
export class Setting {
  @Field(() => ID)
  id: string

  @Prop({ required: false })
  @Field(() => [SettingLink], { nullable: true })
  links?: SettingLink[]

  @Prop({ required: false })
  @Field(() => [Other], { nullable: true })
  other?: Other[]

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}

@ObjectType()
export class SettingConfig {
  @Prop({ required: false })
  @Field(() => Setting, { nullable: true })
  setting?: Setting

  @Prop({ required: false })
  @Field(() => Config, { nullable: true })
  config: Config
}

export const SettingSchema = SchemaFactory.createForClass(Setting)
export type SettingDocument = Setting & Document
