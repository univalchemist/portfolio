import { InputType, Field } from '@nestjs/graphql'

import { ExternalLink } from '@modules/shared/types'

@InputType()
export class VisitInput {
  @Field(() => ExternalLink, { nullable: false })
  from: ExternalLink // from which platform the visitor visited

  @Field(() => String)
  userAgent: string // which browser the visitor visited from

  @Field({ nullable: false })
  userId: string // the user who visitor visited
}
