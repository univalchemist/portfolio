import { InputType, Field } from '@nestjs/graphql'

import { SkillCategory } from './resume.enum'

@InputType()
export class EducationInput {
  @Field(() => Number, { nullable: false })
  index: number

  @Field({ nullable: false })
  startedFrom: string

  @Field({ nullable: true })
  endedAt?: string

  @Field({ nullable: true })
  title?: string

  @Field({ nullable: false })
  at: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  degree?: string

  @Field(() => Boolean, { nullable: true, defaultValue: true })
  visible?: boolean
}

@InputType()
export class SkillInput {
  @Field(() => Number, { nullable: false })
  index: number

  @Field(() => String, { nullable: false })
  name: string

  @Field(() => SkillCategory, { nullable: false })
  category: SkillCategory

  @Field(() => Number, { nullable: false })
  rate: number

  @Field(() => Boolean, { nullable: true, defaultValue: true })
  visible?: boolean
}

@InputType()
export class ExperienceInput {
  @Field(() => Number, { nullable: false })
  index: number

  @Field({ nullable: false })
  startedFrom: string

  @Field({ nullable: true })
  endedAt?: string

  @Field({ nullable: true })
  title?: string

  @Field({ nullable: false })
  at: string

  @Field({ nullable: true })
  description?: string

  @Field(() => Boolean, { nullable: true, defaultValue: true })
  visible?: boolean
}

@InputType()
export class InterestInput {
  @Field(() => Number, { nullable: false })
  index: number

  @Field({ nullable: false })
  title: string

  @Field({ nullable: true })
  description?: string
}

@InputType()
export class ResumeInput {
  @Field({ nullable: true })
  id?: string

  @Field({ nullable: false })
  userId: string

  @Field({ nullable: true })
  description?: string

  @Field(() => [EducationInput], { nullable: true, defaultValue: [] })
  education?: EducationInput[]

  @Field(() => [SkillInput], { nullable: true, defaultValue: [] })
  skills?: SkillInput[]

  @Field(() => [ExperienceInput], { nullable: true, defaultValue: [] })
  experience?: ExperienceInput[]

  @Field(() => [InterestInput], { nullable: true, defaultValue: [] })
  interests?: InterestInput[]
}
