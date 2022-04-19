import { InputType, Field } from '@nestjs/graphql'
import { IsEmail, MinLength } from 'class-validator'

import { AdminType } from './admin.enum'

@InputType()
export class AdminInput {
  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  @IsEmail()
  email: string

  @Field({ nullable: true })
  @MinLength(6)
  password?: string

  @Field(() => AdminType, { nullable: true, defaultValue: AdminType.Admin })
  type?: AdminType
}
