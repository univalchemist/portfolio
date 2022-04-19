import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Reflector } from '@nestjs/core'

import { ROLES_KEY } from '@root/constants'
import { AdminType } from '@modules/admin/admin.enum'

@Injectable()
export class GqlRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<AdminType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    )

    // public access if there is no required roles.
    if (!requiredRoles) {
      return true
    }
    const { user } = GqlExecutionContext.create(context).getContext().req
    // admin can access to anywhere.
    if (user.type === AdminType.SuperAdmin) {
      return true
    }

    const userRoles = []
    if (user.type === AdminType.SuperAdmin) {
      userRoles.push(AdminType.SuperAdmin)
    }
    if (user.type === AdminType.Admin) {
      userRoles.push(AdminType.Admin)
    }
    return requiredRoles.some(role => userRoles.includes(role))
  }
}
