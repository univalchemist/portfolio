import { ObjectType } from '@nestjs/graphql'

import { User } from '@modules/user/user.dto'
import { DatumResponse, DataResponse } from '.'

@ObjectType()
export class UserResponse extends DatumResponse(User) {}

@ObjectType()
export class UsersResponse extends DataResponse(User) {}
