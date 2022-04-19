import { Resolver, Mutation, Query, Args } from '@nestjs/graphql'
import {
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common'

import { AdminsResponse, AdminResponse } from '@modules/shared/response'
import { GqlAuth } from '@modules/auth/decorators/gql-auth.decorator'
import { GqlAuthGuard } from '@modules/auth/guards/gql-auth.guard'
import { GqlCurrentAdminUser } from '@modules/auth/decorators/gql-current-admin-user.decorator'

import { AdminInput } from './admin.input'
import { AdminService } from './admin.service'
import { AdminType } from './admin.enum'
import { Admin } from './admin.dto'

@Resolver()
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @Mutation(() => AdminResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin)
  async createAdmin(@Args('input', { nullable: false }) input: AdminInput) {
    const admin = await this.adminService.create(input)
    if (!admin) {
      throw new InternalServerErrorException()
    }

    return { status: true, message: 'success', data: admin }
  }

  @Mutation(() => AdminResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin)
  async updateAdmin(
    @Args('id', { nullable: false }) id: string,
    @Args('input', { nullable: false }) input: AdminInput,
  ) {
    const admin = await this.adminService.update(id, input)
    if (!admin) {
      throw new InternalServerErrorException()
    }

    return { status: true, message: 'success', data: admin }
  }

  @Mutation(() => AdminResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin)
  async upsertAdmin(@Args('input', { nullable: false }) input: AdminInput) {
    const admin = await this.adminService.upsert(input)
    if (!admin) {
      throw new InternalServerErrorException()
    }

    return { status: true, message: 'success', data: admin }
  }

  @Mutation(() => AdminResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin)
  async deleteAdmin(@Args('id', { nullable: false }) id: string) {
    const res = await this.adminService.delete(id)

    return {
      status: res.deletedCount > 0,
      message: res.deletedCount > 0 ? 'success' : 'failure',
      data: null,
    }
  }

  @Mutation(() => AdminResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin, AdminType.Admin)
  async setTGChatId(
    @Args('id', { nullable: false }) id: string,
    @Args('chatId', { nullable: true }) chatId: string,
  ) {
    const admin = await this.adminService.setTGChatId(id, chatId)
    if (!admin) {
      throw new InternalServerErrorException()
    }

    return { status: true, message: 'success', data: admin }
  }

  @Query(() => AdminsResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin)
  async admins(@GqlCurrentAdminUser() admin: Admin) {
    const admins: Admin[] = await this.adminService.all(admin)

    return { status: true, message: 'success', data: admins }
  }

  @Query(() => AdminResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin)
  async admin(@Args('id', { type: () => String }) id: string) {
    const admin: Admin = await this.adminService.find(id)
    if (!admin) {
      throw new NotFoundException()
    }

    return { status: true, message: 'success', data: admin }
  }
}
