import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { Image } from '@modules/shared/types'
import { PortfolioCategory } from './portfolio.enum'

@Schema({ timestamps: true })
@ObjectType()
export class Portfolio {
  @Field(() => ID)
  id: string

  @Prop({ required: true })
  @Field(() => String, { nullable: false })
  userId: string

  @Prop({ required: true })
  @Field(() => Number, { nullable: false })
  index: number

  @Prop({ required: true })
  @Field(() => PortfolioCategory, { nullable: false })
  category: PortfolioCategory

  @Prop({ required: true })
  @Field({ nullable: false })
  title: string

  @Prop({ required: true })
  @Field({ nullable: false })
  description: string

  @Prop({ required: true })
  @Field(() => Number, { nullable: false })
  view: number

  @Prop({ required: true })
  @Field(() => Number, { nullable: false })
  like: number

  @Prop({ required: true })
  @Field(() => [Image], { nullable: false })
  images: Image[]

  @Prop({ required: true })
  @Field(() => [String], { nullable: false })
  techStacks: string[]

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio)
export type PortfolioDocument = Portfolio & Document
