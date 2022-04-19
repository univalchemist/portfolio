import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { SkillCategory } from './resume.enum'

@ObjectType()
export class Education {
  @Prop({ required: true })
  @Field(() => Number, { nullable: false })
  index: number

  @Prop({ required: true })
  @Field({ nullable: false })
  startedFrom: string

  @Prop({ required: false })
  @Field({ nullable: true })
  endedAt?: string

  @Prop({ required: false })
  @Field({ nullable: true })
  title?: string

  @Prop({ required: true })
  @Field({ nullable: false })
  at: string

  @Prop({ required: false })
  @Field({ nullable: true })
  description?: string

  @Prop({ required: false })
  @Field({ nullable: true })
  degree?: string

  @Prop({ required: true })
  @Field(() => Boolean, { nullable: false })
  visible: boolean
}

@ObjectType()
export class Skill {
  @Prop({ required: true })
  @Field(() => Number, { nullable: false })
  index: number

  @Prop({ required: true })
  @Field(() => String, { nullable: false })
  name: string

  @Prop({ required: true })
  @Field(() => SkillCategory, { nullable: false })
  category: SkillCategory

  @Prop({ required: true, max: 10 })
  @Field(() => Number, { nullable: false })
  rate: number

  @Prop({ required: true })
  @Field(() => Boolean, { nullable: false })
  visible: boolean
}

@ObjectType()
export class Experience {
  @Prop({ required: true })
  @Field(() => Number, { nullable: false })
  index: number

  @Prop({ required: true })
  @Field({ nullable: false })
  startedFrom: string

  @Prop({ required: false })
  @Field({ nullable: true })
  endedAt?: string

  @Prop({ required: false })
  @Field({ nullable: true })
  title?: string

  @Prop({ required: true })
  @Field({ nullable: false })
  at: string

  @Prop({ required: false })
  @Field({ nullable: true })
  description?: string

  @Prop({ required: true })
  @Field(() => Boolean, { nullable: false })
  visible: boolean
}

@ObjectType()
export class Interest {
  @Prop({ required: true })
  @Field(() => Number, { nullable: false })
  index: number

  @Prop({ required: true })
  @Field({ nullable: false })
  title: string

  @Prop({ required: false })
  @Field({ nullable: true })
  description?: string
}

@Schema({ timestamps: true })
@ObjectType()
export class Resume {
  @Field(() => ID)
  id: string

  @Prop({ required: true })
  @Field(() => String, { nullable: false })
  userId: string

  @Prop({ required: false })
  @Field({ nullable: true })
  description?: string

  @Prop({ required: true })
  @Field(() => [Education], { nullable: false })
  education: Education[]

  @Prop({ required: true })
  @Field(() => [Skill], { nullable: false })
  skills: Skill[]

  @Prop({ required: true })
  @Field(() => [Experience], { nullable: false })
  experience: Experience[]

  @Prop({ required: true })
  @Field(() => [Interest], { nullable: false })
  interests: Interest[]

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}

export const ResumeSchema = SchemaFactory.createForClass(Resume)
export type ResumeDocument = Resume & Document
