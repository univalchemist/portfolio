import { ObjectType } from '@nestjs/graphql'

import { Admin } from '@modules/admin/admin.dto'
import { DatumResponse, DataResponse } from '.'

@ObjectType()
export class AdminResponse extends DatumResponse(Admin) {}

@ObjectType()
export class AdminsResponse extends DataResponse(Admin) {}
