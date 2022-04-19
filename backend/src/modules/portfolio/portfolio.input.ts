import { InputType, Field } from '@nestjs/graphql'

import { ImageInput, Uploads } from '@modules/shared/types'
import { PortfolioCategory } from './portfolio.enum'

@InputType()
export class PortfolioInput {
  @Field({ nullable: true })
  id?: string

  @Field({ nullable: false })
  userId: string

  @Field(() => Number, { nullable: false })
  index: number

  @Field(() => PortfolioCategory, { nullable: false })
  category: PortfolioCategory

  @Field({ nullable: false })
  title: string

  @Field({ nullable: true })
  description?: string

  @Field(() => Number, { nullable: true, defaultValue: 0 })
  view: number

  @Field(() => Number, { nullable: true, defaultValue: 0 })
  like: number

  @Field(() => [ImageInput], { nullable: true, defaultValue: [] })
  images: ImageInput[]

  @Field(() => [String], { nullable: true, defaultValue: [] })
  techStacks: string[]

  @Field(() => [Uploads], { nullable: true })
  newImages?: Uploads[]
}
