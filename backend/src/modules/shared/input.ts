import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class ImageInput {
  @Field({ nullable: false })
  index: string

  @Field({ nullable: false })
  url: string
}
