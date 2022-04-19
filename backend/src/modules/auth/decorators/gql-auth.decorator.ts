import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'

import { ROLES_KEY } from '@root/constants'
import { AdminType } from '@modules/admin/admin.enum'
import { GqlRolesGuard } from '@modules/auth/guards/gql-roles.guard'
import { GqlAuthGuard } from '@modules/auth/guards/gql-auth.guard'

export function GqlAuth(...roles: AdminType[]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(GqlAuthGuard, GqlRolesGuard),
  )
}
