import { registerEnumType } from '@nestjs/graphql'

export enum AdminType {
  Admin = 'Admin',
  SuperAdmin = 'SuperAdmin',
}

registerEnumType(AdminType, {
  name: 'AdminType',
})
