import { InputType, Field } from '@nestjs/graphql'

import { ExternalLink } from '@modules/shared/types'

@InputType()
export class ContactInput {
  @Field({ nullable: false })
  userId: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: false })
  email: string

  @Field({ nullable: true })
  message?: string

  @Field(() => ExternalLink, { nullable: true })
  ref?: ExternalLink
}
