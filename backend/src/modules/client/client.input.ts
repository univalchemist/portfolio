import { InputType, Field } from '@nestjs/graphql'

import { ImageInput, Uploads } from '@modules/shared/types'

@InputType()
export class ClientInput {
  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  userId?: string

  @Field(() => Number, { nullable: true, defaultValue: 0 })
  index?: number

  @Field({ nullable: false })
  name: string

  @Field({ nullable: true })
  clientInfo?: string

  @Field(() => ImageInput, { nullable: true })
  logo?: ImageInput

  @Field({ nullable: true })
  url?: string

  @Field({ nullable: true })
  feedback?: string

  @Field(() => Boolean, { nullable: true, defaultValue: true })
  visible?: boolean

  @Field(() => Uploads, { nullable: true })
  newLogo?: Uploads
}
