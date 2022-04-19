import { InputType, Field } from '@nestjs/graphql'
import { IsEmail, MaxLength } from 'class-validator'

import { ExternalLink, ImageInput } from '@modules/shared/types'

@InputType()
export class UserLinkInput {
  @Field(() => Number, { nullable: false })
  index: number

  @Field(() => ExternalLink, { nullable: false })
  name: ExternalLink

  @Field({ nullable: false })
  url: string

  @Field(() => Boolean, { nullable: false })
  visible: boolean
}

@InputType()
export class UserInput {
  @Field({ nullable: false })
  slug: string

  @Field()
  @MaxLength(30)
  firstName: string

  @Field({ nullable: true })
  @MaxLength(30)
  middleName?: string

  @Field()
  @MaxLength(30)
  lastName: string

  @Field()
  @IsEmail()
  email: string

  @Field({ nullable: true })
  phone?: string

  @Field({ nullable: true })
  address?: string

  @Field()
  title: string

  @Field({ nullable: true })
  availability?: string

  @Field(() => [ImageInput], { nullable: true, defaultValue: [] })
  backgroundImages: ImageInput[]

  @Field({ nullable: true })
  slogan?: string

  @Field()
  bio: string

  @Field(() => [UserLinkInput], { nullable: true, defaultValue: [] })
  links?: UserLinkInput[]

  @Field(() => Boolean, { nullable: true, defaultValue: true })
  active?: boolean
}
