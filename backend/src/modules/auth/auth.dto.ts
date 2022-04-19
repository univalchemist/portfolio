import { ObjectType, Field } from '@nestjs/graphql'

import { Admin } from '@modules/admin/admin.dto'

@ObjectType()
export class SignIn {
  @Field(() => String, { nullable: false })
  accessToken: string

  @Field(() => Admin, { nullable: false })
  admin: Admin
}
