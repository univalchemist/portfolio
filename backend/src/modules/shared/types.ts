import { ObjectType, Field, InputType, registerEnumType } from '@nestjs/graphql'
import { Prop } from '@nestjs/mongoose'
import { FileUpload, GraphQLUpload } from 'graphql-upload'

import { Education, Experience, Skill } from '@modules/resume/resume.dto'
import { SkillCategory } from '@modules/resume/resume.enum'

@ObjectType()
export class Image {
  @Field(() => String)
  id: string

  @Prop({ required: false })
  @Field(() => Number, { nullable: true, defaultValue: 0 })
  index: number

  @Prop({ required: true })
  @Field({ nullable: false })
  path: string

  @Prop({ required: true })
  @Field({ nullable: false })
  url: string
}

@InputType()
export class ImageInput {
  @Field(() => String)
  id: string

  @Field(() => Number, { nullable: true, defaultValue: 0 })
  index: number

  @Field({ nullable: false })
  path: string

  @Field({ nullable: false })
  url: string
}

@InputType()
export class Uploads {
  @Field(() => String, { nullable: true })
  id?: string

  @Field(() => Number, { nullable: true, defaultValue: 0 })
  index: number

  @Field(() => GraphQLUpload, { nullable: true })
  file?: FileUpload

  @Field(() => String, { nullable: true })
  prevPath?: string
}

export class CVBData {
  avatar: string
  userName: string
  profileUrl: string
  slogan: string | undefined | null
  title: string
  bio: string
  phone: string | undefined | null
  email: string
  address: string | undefined | null
  linkedin: string | undefined | null
  interests: string[] | undefined
  education: (Education & { duration: string })[] | undefined
  experience: (Experience & { duration: string })[] | undefined
  skills: { category: SkillCategory; data: Skill[] }[] | undefined
}

export enum ExternalLink {
  Angel = 'Angel',
  Facebook = 'Facebook',
  Freelancer = 'Freelancer',
  Fiverr = 'Fiverr',
  Github = 'Github',
  Gun = 'Gun',
  Guru = 'Guru',
  Indeed = 'Indeed',
  LinkedIn = 'LinkedIn',
  PeoplePerHour = 'PeoplePerHour',
  TopCoder = 'TopCoder',
  Twitter = 'Twitter',
  Upwork = 'Upwork',
  Other = 'Other',
}

registerEnumType(ExternalLink, {
  name: 'ExternalLink',
})
