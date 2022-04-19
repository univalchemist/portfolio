import { ObjectType } from '@nestjs/graphql'

import { DatumResponse } from '.'
import { SignIn } from '@modules/auth/auth.dto'

@ObjectType()
export class SignInResponse extends DatumResponse(SignIn) {}
