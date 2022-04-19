import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class FeatureInput {
  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  userId?: string

  @Field(() => Number, { nullable: true, defaultValue: 0 })
  index?: number

  @Field({ nullable: false })
  title: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  icon?: string
}
